/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { User, Role, RoleType, Department } from '../entities';
import {
  CreateUserDto,
  ActivateAccountDto,
  LoginDto,
  PasswordResetRequestDto,
  PasswordResetConfirmDto,
  AuthResponseDto,
  TokenDto,
  UserProfileDto,
  CreateUserResponseDto,
  MessageResponseDto,
} from './dto';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { AuditService } from './services/audit.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private tokenService: TokenService,
    private auditService: AuditService,
  ) {}

  /**
   * Public signup (for HR, Department Chiefs, Students)
   */
  async publicSignup(
    createUserDto: CreateUserDto,
    ipAddress: string,
    userAgent: string,
  ): Promise<{ authResponse: AuthResponseDto; refreshToken: string }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Verify department if DEPT_CHIEF
    if (createUserDto.role === RoleType.DEPT_CHIEF && !createUserDto.departmentId) {
      throw new BadRequestException('Department is required for DEPT_CHIEF role');
    }

    // Get role
    const role = await this.roleRepository.findOne({
      where: { name: createUserDto.role },
    });

    if (!role) {
      throw new BadRequestException('Invalid role');
    }

    // Validate password (assuming password is provided in createUserDto temporarily)
    const password = (createUserDto as any).password || 'TempPassword123!';
    const validation = this.passwordService.validate(password, {
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
    });

    if (!validation.valid) {
      throw new BadRequestException(validation.errors.join(', '));
    }

    // Create user with ACTIVE status (immediate access)
    const user = this.userRepository.create({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      roleId: role.id,
      departmentId: createUserDto.departmentId,
      status: 'ACTIVE',
      password: await this.passwordService.hash(password),
      passwordChangedAt: new Date(),
      createdBy: null, // Self-registered
    });

    await this.userRepository.save(user);

    // Load user with relations
    const savedUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['role', 'department'],
    });

    // Audit log
    await this.auditService.log({
      action: 'USER_SIGNUP',
      userId: user.id,
      ipAddress,
      userAgent,
      details: { email: user.email, role: createUserDto.role },
    });

    // Generate tokens
    const accessToken = this.generateAccessToken(savedUser!);
    const refreshToken = await this.tokenService.createRefreshToken(
      savedUser!,
      ipAddress,
      userAgent,
    );

    return {
      authResponse: {
        token: { accessToken },
        user: this.mapToUserProfile(savedUser!),
      },
      refreshToken,
    };
  }

  /**
   * Create new user (HR Admin only)
   */
  async createUser(
    createUserDto: CreateUserDto,
    createdBy: string,
  ): Promise<CreateUserResponseDto> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Verify department if DEPT_CHIEF
    if (createUserDto.role === RoleType.DEPT_CHIEF && !createUserDto.departmentId) {
      throw new BadRequestException('Department is required for DEPT_CHIEF role');
    }

    // Get role
    const role = await this.roleRepository.findOne({
      where: { name: createUserDto.role },
    });

    if (!role) {
      throw new BadRequestException('Invalid role');
    }

    // Create user
    const user = this.userRepository.create({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      roleId: role.id,
      departmentId: createUserDto.departmentId,
      status: 'PENDING',
      password: await this.passwordService.hash(crypto.randomUUID()), // Temporary password
      createdBy,
    });

    await this.userRepository.save(user);

    // Generate activation token
    const token = await this.tokenService.createActivationToken(user.id, 'ACTIVATION');
    const activationLink = `${process.env.FRONTEND_URL}/activate?token=${token}`;

    // Audit log
    await this.auditService.log({
      action: 'ACCOUNT_CREATED',
      userId: createdBy,
      targetId: user.id,
      details: { email: user.email, role: createUserDto.role },
    });

    // TODO: Send activation email

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48);

    return {
      userId: user.id,
      activationLink,
      expiresAt,
    };
  }

  /**
   * Activate account and set password
   */
  async activateAccount(
    activateDto: ActivateAccountDto,
  ): Promise<MessageResponseDto> {
    // Validate token
    const tokenRecord = await this.tokenService.validateActivationToken(
      activateDto.token,
      'ACTIVATION',
    );

    if (!tokenRecord) {
      throw new BadRequestException('Invalid or expired activation token');
    }

    const user = tokenRecord.user;

    // Validate password
    const validation = this.passwordService.validate(activateDto.password, user);
    if (!validation.valid) {
      throw new BadRequestException(validation.errors.join(', '));
    }

    // Hash and save password
    user.password = await this.passwordService.hash(activateDto.password);
    user.status = 'ACTIVE';
    user.passwordChangedAt = new Date();

    await this.userRepository.save(user);

    // Mark token as used
    await this.tokenService.markTokenAsUsed(tokenRecord.id);

    // Audit log
    await this.auditService.log({
      action: 'ACCOUNT_ACTIVATED',
      userId: user.id,
      details: { email: user.email },
    });

    return { message: 'Account activated successfully' };
  }

  /**
   * Login
   */
  async login(
    loginDto: LoginDto,
    ipAddress: string,
    userAgent: string,
  ): Promise<{ authResponse: AuthResponseDto; refreshToken: string }> {
    // Find user
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      relations: ['role', 'department'],
    });

    if (!user) {
      // Don't reveal if user exists
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check account status
    if (user.status === 'LOCKED') {
      if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
        throw new UnauthorizedException(
          `Account locked until ${user.accountLockedUntil.toISOString()}`,
        );
      } else {
        // Unlock if lockout period expired
        user.status = 'ACTIVE';
        user.failedLoginAttempts = 0;
        user.accountLockedUntil = null;
        await this.userRepository.save(user);
      }
    }

    if (user.status === 'SUSPENDED') {
      throw new UnauthorizedException('Account is suspended');
    }

    if (user.status === 'PENDING') {
      throw new UnauthorizedException('Account is not activated');
    }

    // Verify password
    const isPasswordValid = await this.passwordService.verify(
      user.password,
      loginDto.password,
    );

    if (!isPasswordValid) {
      // Increment failed login attempts
      user.failedLoginAttempts += 1;

      // Check if should lock account
      if (user.failedLoginAttempts >= 5) {
        user.status = 'LOCKED';
        user.accountLockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        user.lockoutCount24h += 1;

        await this.userRepository.save(user);

        await this.auditService.log({
          action: 'ACCOUNT_LOCKED',
          userId: user.id,
          ipAddress,
          details: { reason: 'Multiple failed login attempts' },
          severity: 'WARNING',
        });

        throw new UnauthorizedException('Account locked due to multiple failed attempts');
      }

      await this.userRepository.save(user);

      await this.auditService.log({
        action: 'LOGIN_FAILED',
        userId: user.id,
        ipAddress,
        details: { email: loginDto.email },
        severity: 'WARNING',
      });

      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset failed attempts on successful login
    user.failedLoginAttempts = 0;
    user.lastLogin = new Date();
    await this.userRepository.save(user);

    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.tokenService.createRefreshToken(
      user,
      ipAddress,
      userAgent,
    );

    // Audit log
    await this.auditService.log({
      action: 'USER_LOGIN',
      userId: user.id,
      ipAddress,
      userAgent,
      details: { email: user.email },
    });

    return {
      authResponse: {
        token: { accessToken },
        user: this.mapToUserProfile(user),
      },
      refreshToken,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(
    token: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<{ authResponse: TokenDto; refreshToken: string }> {
    const tokenRecord = await this.tokenService.validateRefreshToken(token);

    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userRepository.findOne({
      where: { id: tokenRecord.userId },
      relations: ['role', 'department'],
    });

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User not found or inactive');
    }

    // Generate new tokens
    const accessToken = this.generateAccessToken(user);
    const newRefreshToken = await this.tokenService.rotateRefreshToken(
      tokenRecord,
      ipAddress,
      userAgent,
    );

    return {
      authResponse: { accessToken },
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Logout
   */
  async logout(refreshToken: string): Promise<MessageResponseDto> {
    const tokenRecord = await this.tokenService.validateRefreshToken(refreshToken);

    if (tokenRecord) {
      await this.tokenService.revokeTokenFamily(tokenRecord.familyId);

      await this.auditService.log({
        action: 'USER_LOGOUT',
        userId: tokenRecord.userId,
      });
    }

    return { message: 'Logged out successfully' };
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(userId: string): Promise<UserProfileDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role', 'department'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.mapToUserProfile(user);
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(
    dto: PasswordResetRequestDto,
  ): Promise<MessageResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email, status: 'ACTIVE' },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return {
        message: 'If the email exists, a reset link has been sent',
      };
    }

    // Generate reset token
    const token = await this.tokenService.createActivationToken(
      user.id,
      'PASSWORD_RESET',
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    // Audit log
    await this.auditService.log({
      action: 'PASSWORD_RESET_REQUEST',
      userId: user.id,
      details: { email: user.email },
    });

    // TODO: Send reset email

    return {
      message: 'If the email exists, a reset link has been sent',
    };
  }

  /**
   * Confirm password reset
   */
  async confirmPasswordReset(
    dto: PasswordResetConfirmDto,
  ): Promise<MessageResponseDto> {
    const tokenRecord = await this.tokenService.validateActivationToken(
      dto.token,
      'PASSWORD_RESET',
    );

    if (!tokenRecord) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const user = tokenRecord.user;

    // Validate password
    const validation = this.passwordService.validate(dto.newPassword, user);
    if (!validation.valid) {
      throw new BadRequestException(validation.errors.join(', '));
    }

    // Check password history
    const isInHistory = await this.passwordService.isInHistory(
      dto.newPassword,
      user.passwordHistory || [],
    );

    if (isInHistory) {
      throw new BadRequestException('Cannot reuse recent passwords');
    }

    // Update password history
    const passwordHistory = user.passwordHistory || [];
    passwordHistory.unshift(user.password);
    if (passwordHistory.length > 5) {
      passwordHistory.pop();
    }

    // Hash and save password
    user.password = await this.passwordService.hash(dto.newPassword);
    user.passwordHistory = passwordHistory;
    user.passwordChangedAt = new Date();
    user.failedLoginAttempts = 0;
    user.accountLockedUntil = null;
    user.status = 'ACTIVE';

    await this.userRepository.save(user);

    // Revoke all refresh tokens
    await this.tokenService.revokeAllUserTokens(user.id);

    // Mark token as used
    await this.tokenService.markTokenAsUsed(tokenRecord.id);

    // Audit log
    await this.auditService.log({
      action: 'PASSWORD_CHANGED',
      userId: user.id,
      details: { method: 'reset' },
    });

    return { message: 'Password reset successfully' };
  }

  /**
   * Generate JWT access token
   */
  private generateAccessToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
      department: user.department?.id || null,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
  }

  /**
   * Map User entity to UserProfileDto
   */
  private mapToUserProfile(user: User): UserProfileDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
      department: user.department?.name,
      lastLogin: user.lastLogin,
      mfaEnabled: user.mfaEnabled,
    };
  }
}

