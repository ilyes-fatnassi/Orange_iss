import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { AuditService } from './services/audit.service';
import { User, Role, Department, RefreshToken, ActivationToken, AuditLog } from '../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Department,
      RefreshToken,
      ActivationToken,
      AuditLog,
    ]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'your-secret-key-change-in-production',
        signOptions: {
          expiresIn: '15m', // Short-lived access tokens
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PasswordService,
    TokenService,
    AuditService,
  ],
  exports: [AuthService, JwtModule, PasswordService, TokenService, AuditService],
})
export class AuthModule {}
