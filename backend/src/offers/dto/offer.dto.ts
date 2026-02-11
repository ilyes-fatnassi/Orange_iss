import { IsString, MinLength, MaxLength, IsOptional, IsUUID, ArrayMaxSize, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty({ example: 'Full-Stack Web Developer Intern' })
  @IsString()
  @MinLength(5, { message: 'Title must be at least 5 characters' })
  @MaxLength(255, { message: 'Title must not exceed 255 characters' })
  title: string;

  @ApiProperty({ example: 'We are looking for a motivated intern to join our web team...' })
  @IsString()
  @MinLength(20, { message: 'Description must be at least 20 characters' })
  description: string;

  @ApiProperty({
    example: ['topic-uuid-1', 'topic-uuid-2'],
    description: 'Array of topic IDs (max 3)',
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMaxSize(3, { message: 'An offer can have at most 3 topics' })
  topicIds: string[];
}

export class UpdateOfferDto {
  @ApiProperty({ example: 'Updated Title', required: false })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  title?: string;

  @ApiProperty({ example: 'Updated description...', required: false })
  @IsOptional()
  @IsString()
  @MinLength(20)
  description?: string;

  @ApiProperty({ example: ['topic-uuid-1'], required: false })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMaxSize(3, { message: 'An offer can have at most 3 topics' })
  topicIds?: string[];
}
