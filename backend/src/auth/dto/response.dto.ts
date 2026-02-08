import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from '../../entities';

export class TokenDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;
}

export class UserProfileDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'john.doe@orange.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'HR_ADMIN', enum: RoleType })
  role: RoleType;

  @ApiProperty({ example: 'Engineering', required: false })
  department?: string;

  @ApiProperty({ example: '2026-02-08T10:30:00Z', required: false })
  lastLogin?: Date;

  @ApiProperty({ example: false })
  mfaEnabled: boolean;
}

export class AuthResponseDto {
  @ApiProperty({ type: TokenDto })
  token: TokenDto;

  @ApiProperty({ type: UserProfileDto })
  user: UserProfileDto;
}

export class MessageResponseDto {
  @ApiProperty({ example: 'Operation completed successfully' })
  message: string;
}

export class CreateUserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  userId: string;

  @ApiProperty({ example: 'https://iss.orange.com/activate?token=XXX' })
  activationLink: string;

  @ApiProperty({ example: '2026-02-10T10:30:00Z' })
  expiresAt: Date;
}
