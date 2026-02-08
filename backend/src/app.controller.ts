import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { Department } from './entities';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth(): { message: string; timestamp: string } {
    return this.appService.getHealth();
  }

  @Get('departments')
  @ApiOperation({ summary: 'List all departments' })
  async getDepartments() {
    const departments = await this.departmentRepo.find({ order: { name: 'ASC' } });
    return departments.map(d => ({ id: d.id, name: d.name }));
  }
}
