import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { CurrentUser, Roles } from '../auth/decorators';
import { User, RoleType } from '../entities';

@ApiTags('likes')
@Controller('likes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post('offers/:offerId')
  @Roles(RoleType.CANDIDATE)
  @ApiOperation({
    summary: 'Like an offer',
    description: 'Candidate saves/favorites an approved offer',
  })
  @ApiResponse({ status: 201, description: 'Offer liked' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  @ApiResponse({ status: 409, description: 'Already liked' })
  async like(
    @Param('offerId', ParseUUIDPipe) offerId: string,
    @CurrentUser() user: User,
  ) {
    return this.likesService.like(offerId, user);
  }

  @Delete('offers/:offerId')
  @Roles(RoleType.CANDIDATE)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Unlike an offer',
    description: 'Candidate removes an offer from favorites',
  })
  @ApiResponse({ status: 204, description: 'Offer unliked' })
  @ApiResponse({ status: 404, description: 'Like not found' })
  async unlike(
    @Param('offerId', ParseUUIDPipe) offerId: string,
    @CurrentUser() user: User,
  ) {
    return this.likesService.unlike(offerId, user);
  }

  @Get()
  @Roles(RoleType.CANDIDATE)
  @ApiOperation({
    summary: 'My liked offers',
    description: 'Candidate sees their saved/favorited offers',
  })
  @ApiResponse({ status: 200, description: 'List of liked offers' })
  async findMyLikes(@CurrentUser() user: User) {
    return this.likesService.findMyLikes(user.id);
  }
}
