import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from '../entities';

@ApiTags('topics')
@Controller('topics')
export class TopicsController {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all topics', description: 'Public endpoint — returns all available topics' })
  @ApiResponse({ status: 200, description: 'List of topics' })
  async findAll(): Promise<Topic[]> {
    return this.topicRepository.find({ order: { name: 'ASC' } });
  }
}
