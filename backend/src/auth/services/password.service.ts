import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class PasswordService {
  private static readonly BLACKLIST = [
    'Password123',
    'Orange2024',
    'Orange2026',
    'Admin123',
    'Welcome123',
    '123456789',
    'qwerty123',
  ];

  /**
   * Hash password using Node.js built-in crypto (PBKDF2)
   * Note: In production, install argon2 package for better security
   */
  async hash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');
      crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + ':' + derivedKey.toString('hex'));
      });
    });
  }

  /**
   * Verify password against hash
   */
  async verify(hash: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':');
      crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
        if (err) reject(err);
        resolve(key === derivedKey.toString('hex'));
      });
    });
  }

  /**
   * Validate password against policy
   */
  validate(password: string, user?: { email: string; firstName: string; lastName: string }): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Length check
    if (password.length < 12) {
      errors.push('Password must be at least 12 characters');
    }

    // Complexity check (at least 3 of 4 categories)
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);
    const complexity = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length;

    if (complexity < 3) {
      errors.push(
        'Password must include at least 3 of: uppercase, lowercase, numbers, symbols',
      );
    }

    // Blacklist check
    if (PasswordService.BLACKLIST.some(blocked => password.toLowerCase().includes(blocked.toLowerCase()))) {
      errors.push('This password is too common');
    }

    // Personal info check
    if (user) {
      const emailUser = user.email.split('@')[0].toLowerCase();
      if (password.toLowerCase().includes(emailUser) ||
          password.toLowerCase().includes(user.firstName.toLowerCase()) ||
          password.toLowerCase().includes(user.lastName.toLowerCase())) {
        errors.push('Password cannot contain your personal information');
      }
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Check if password is in history
   */
  async isInHistory(password: string, passwordHistory: string[]): Promise<boolean> {
    if (!passwordHistory || passwordHistory.length === 0) {
      return false;
    }

    for (const oldHash of passwordHistory) {
      if (await this.verify(oldHash, password)) {
        return true;
      }
    }
    return false;
  }
}
