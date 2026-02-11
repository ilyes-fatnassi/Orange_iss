import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { CurrentUser, Roles } from '../auth/decorators';
import { User, RoleType } from '../entities';

@ApiTags('applications')
@Controller('applications')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Post('offers/:offerId')
  @Roles(RoleType.CANDIDATE)
  @ApiOperation({
    summary: 'Apply to an offer',
    description: 'Candidate submits an application to an approved offer',
  })
  @ApiResponse({ status: 201, description: 'Application submitted' })
  @ApiResponse({ status: 404, description: 'Offer not found or not approved' })
  @ApiResponse({ status: 409, description: 'Already applied' })
  async apply(
    @Param('offerId', ParseUUIDPipe) offerId: string,
    @CurrentUser() user: User,
  ) {
    return this.applicationsService.apply(offerId, user);
  }

  @Get()
  @Roles(RoleType.CANDIDATE)
  @ApiOperation({
    summary: 'My applications',
    description: 'Candidate sees their submitted applications and statuses',
  })
  @ApiResponse({ status: 200, description: 'List of applications' })
  async findMyApplications(@CurrentUser() user: User) {
    return this.applicationsService.findMyApplications(user.id);
  }
}
