import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto, UpdateOfferDto } from './dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { CurrentUser, Roles } from '../auth/decorators';
import { User, RoleType } from '../entities';

@ApiTags('offers')
@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  /**
   * Public endpoint — no auth required. Landing page uses this.
   */
  @Get('public')
  @ApiOperation({
    summary: 'Public approved offers',
    description: 'Returns all approved offers — no authentication needed (landing page)',
  })
  @ApiResponse({ status: 200, description: 'List of approved offers' })
  async findPublic() {
    return this.offersService.findPublic();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(RoleType.DEPT_CHIEF)
  @ApiOperation({
    summary: 'Create offer',
    description: 'Department Chief creates a new internship offer (max 3 topics)',
  })
  @ApiResponse({ status: 201, description: 'Offer created with PENDING status' })
  @ApiResponse({ status: 403, description: 'Only Department Chiefs can create offers' })
  async create(
    @Body() dto: CreateOfferDto,
    @CurrentUser() user: User,
  ) {
    return this.offersService.create(dto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(RoleType.CANDIDATE, RoleType.DEPT_CHIEF, RoleType.HR_ADMIN, RoleType.SUPER_ADMIN)
  @ApiOperation({
    summary: 'List offers',
    description: 'Candidates see approved offers, Chiefs see their own, HR sees all',
  })
  @ApiResponse({ status: 200, description: 'List of offers' })
  async findAll(@CurrentUser() user: User) {
    return this.offersService.findAll(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(RoleType.CANDIDATE, RoleType.DEPT_CHIEF, RoleType.HR_ADMIN, RoleType.SUPER_ADMIN)
  @ApiOperation({ summary: 'Get offer details' })
  @ApiResponse({ status: 200, description: 'Offer details' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ) {
    return this.offersService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(RoleType.DEPT_CHIEF)
  @ApiOperation({
    summary: 'Update offer',
    description: 'Department Chief edits their own offer. Declined offers are resubmitted as PENDING.',
  })
  @ApiResponse({ status: 200, description: 'Offer updated' })
  @ApiResponse({ status: 403, description: 'Can only edit own offers' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateOfferDto,
    @CurrentUser() user: User,
  ) {
    return this.offersService.update(id, dto, user);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(RoleType.HR_ADMIN, RoleType.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Approve offer',
    description: 'HR approves an offer — makes it visible to candidates',
  })
  @ApiResponse({ status: 200, description: 'Offer approved' })
  async approve(@Param('id', ParseUUIDPipe) id: string) {
    return this.offersService.approve(id);
  }

  @Patch(':id/decline')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @Roles(RoleType.HR_ADMIN, RoleType.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Decline offer',
    description: 'HR declines an offer',
  })
  @ApiResponse({ status: 200, description: 'Offer declined' })
  async decline(@Param('id', ParseUUIDPipe) id: string) {
    return this.offersService.decline(id);
  }
}
