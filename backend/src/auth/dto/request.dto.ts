import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional, IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '../../entities';

/**
 * DTO for public candidate signup — no role selection, always CANDIDATE
 */
export class CandidateSignupDto {
  @ApiProperty({ example: 'john.doe@email.com' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName: string;

  @ApiProperty({ example: 'SecurePass123!@#' })
  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters long' })
  password: string;
}

/**
 * DTO for admin-created users (HR, Dept Chiefs) — requires role selection
 */
export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@orange.com' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName: string;

  @ApiProperty({ example: 'HR_ADMIN', enum: RoleType })
  @IsEnum(RoleType)
  role: RoleType;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  @IsOptional()
  @IsUUID()
  departmentId?: string;
}

export class ActivateAccountDto {
  @ApiProperty({ example: 'activation-token-uuid' })
  @IsString()
  token: string;

  @ApiProperty({
    example: 'SecurePass123!@#',
    description: 'Password must be 12+ characters with at least 3 of: uppercase, lowercase, numbers, symbols',
  })
  @IsString()
  @MinLength(12, { message: 'Password must be at least 12 characters long' })
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john.doe@orange.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePass123!@#' })
  @IsString()
  password: string;
}

export class PasswordResetRequestDto {
  @ApiProperty({ example: 'john.doe@orange.com' })
  @IsEmail()
  email: string;
}

export class PasswordResetConfirmDto {
  @ApiProperty({ example: 'reset-token-uuid' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'NewSecurePass123!@#' })
  @IsString()
  @MinLength(12)
  newPassword: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh-token-uuid' })
  @IsString()
  refreshToken: string;
}
