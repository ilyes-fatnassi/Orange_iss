import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { RefreshToken, ActivationToken, User } from '../../entities';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    @InjectRepository(ActivationToken)
    private activationTokenRepository: Repository<ActivationToken>,
  ) {}

  /**
   * Generate a secure random token
   */
  generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Hash a token using SHA-256
   */
  hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Create refresh token
   */
  async createRefreshToken(
    user: User,
    ipAddress: string,
    userAgent: string,
  ): Promise<string> {
    const token = this.generateSecureToken();
    const tokenHash = this.hashToken(token);
    const familyId = crypto.randomUUID();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const refreshToken = this.refreshTokenRepository.create({
      userId: user.id,
      tokenHash,
      familyId,
      expiresAt,
      ipAddress,
      userAgent,
    });

    await this.refreshTokenRepository.save(refreshToken);
    return token;
  }

  /**
   * Validate refresh token
   */
  async validateRefreshToken(token: string): Promise<RefreshToken | null> {
    const tokenHash = this.hashToken(token);

    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { tokenHash },
      relations: ['user'],
    });

    if (!refreshToken) {
      return null;
    }

    // Check if revoked
    if (refreshToken.revokedAt) {
      // Token reuse detected - revoke entire family
      await this.revokeTokenFamily(refreshToken.familyId);
      return null;
    }

    // Check if expired
    if (refreshToken.expiresAt < new Date()) {
      return null;
    }

    return refreshToken;
  }

  /**
   * Rotate refresh token
   */
  async rotateRefreshToken(
    oldToken: RefreshToken,
    ipAddress: string,
    userAgent: string,
  ): Promise<string> {
    // Revoke old token
    oldToken.revokedAt = new Date();
    await this.refreshTokenRepository.save(oldToken);

    // Create new token with same family
    const newToken = this.generateSecureToken();
    const tokenHash = this.hashToken(newToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const refreshToken = this.refreshTokenRepository.create({
      userId: oldToken.userId,
      tokenHash,
      familyId: oldToken.familyId,
      expiresAt,
      ipAddress,
      userAgent,
    });

    await this.refreshTokenRepository.save(refreshToken);
    return newToken;
  }

  /**
   * Revoke all tokens in a family (token reuse detected)
   */
  async revokeTokenFamily(familyId: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { familyId, revokedAt: null },
      { revokedAt: new Date() },
    );
  }

  /**
   * Revoke all user tokens
   */
  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { userId, revokedAt: null },
      { revokedAt: new Date() },
    );
  }

  /**
   * Create activation token
   */
  async createActivationToken(
    userId: string,
    type: 'ACTIVATION' | 'PASSWORD_RESET',
  ): Promise<string> {
    const token = this.generateSecureToken();
    const tokenHash = this.hashToken(token);

    const expiresAt = new Date();
    // Activation tokens expire in 48 hours, password reset in 1 hour
    expiresAt.setHours(expiresAt.getHours() + (type === 'ACTIVATION' ? 48 : 1));

    const activationToken = this.activationTokenRepository.create({
      userId,
      tokenHash,
      tokenType: type,
      expiresAt,
    });

    await this.activationTokenRepository.save(activationToken);
    return token;
  }

  /**
   * Validate activation token
   */
  async validateActivationToken(
    token: string,
    type: 'ACTIVATION' | 'PASSWORD_RESET',
  ): Promise<ActivationToken | null> {
    const tokenHash = this.hashToken(token);

    const activationToken = await this.activationTokenRepository.findOne({
      where: { tokenHash, tokenType: type },
      relations: ['user'],
    });

    if (!activationToken) {
      return null;
    }

    // Check if already used
    if (activationToken.usedAt) {
      return null;
    }

    // Check if expired
    if (activationToken.expiresAt < new Date()) {
      return null;
    }

    return activationToken;
  }

  /**
   * Mark activation token as used
   */
  async markTokenAsUsed(tokenId: string): Promise<void> {
    await this.activationTokenRepository.update(tokenId, { usedAt: new Date() });
  }

  /**
   * Clean up expired tokens
   */
  async cleanupExpiredTokens(): Promise<void> {
    const now = new Date();

    // Delete expired refresh tokens
    await this.refreshTokenRepository.delete({
      expiresAt: LessThan(now),
    });

    // Delete old activation tokens (older than 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    await this.activationTokenRepository.delete({
      expiresAt: LessThan(sevenDaysAgo),
    });
  }
}
