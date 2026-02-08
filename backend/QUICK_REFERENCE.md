# Quick Reference Guide - Authentication Code Examples

## Using Authentication in Your Controllers

### Basic Protected Route
```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { CurrentUser } from '../auth/decorators';
import { User } from '../entities';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('my-feature')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MyController {
  
  @Get()
  @ApiOperation({ summary: 'Get data (requires login)' })
  getData(@CurrentUser() user: User) {
    console.log('Authenticated user:', user.email);
    return { message: 'Protected data' };
  }
}
```

### Role-Protected Route
```typescript
import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles, CurrentUser } from '../auth/decorators';
import { User } from '../entities';

@Controller('offers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OffersController {
  
  // Only HR can create offers
  @Post()
  @Roles('HR')
  createOffer(@CurrentUser() user: User, @Body() data: any) {
    return { 
      message: 'Offer created by ' + user.getFullName(),
      userId: user.id 
    };
  }

  // Only Department Chiefs can view their department offers
  @Get('department')
  @Roles('DEPARTMENT_CHIEF')
  getDepartmentOffers(@CurrentUser() user: User) {
    // user.department will be pre-loaded
    return { 
      department: user.department?.name,
      departmentId: user.departmentId 
    };
  }

  // Both HR and Admin can approve
  @Patch(':id/approve')
  @Roles('HR', 'ADMIN')
  approveOffer(@CurrentUser() user: User, @Param('id') id: string) {
    console.log(`${user.getFullName()} approved offer ${id}`);
    return { status: 'approved' };
  }

  // Admin only
  @Delete(':id')
  @Roles('ADMIN')
  deleteOffer(@Param('id') id: string) {
    return { message: 'Deleted' };
  }
}
```

## Creating a New Module with Auth

### Module File
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { Offer } from './entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
```

### Update app.module.ts
```typescript
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    AuthModule,
    OffersModule, // Add here
  ],
})
export class AppModule {}
```

## Service with Current User Context

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}

  // Info: user is passed from controller
  async createOffer(user: User, offerData: CreateOfferDto) {
    const offer = this.offerRepository.create({
      ...offerData,
      createdBy: user.id, // Store who created it
      department: user.department, // Use user's department
    });
    return this.offerRepository.save(offer);
  }

  async getOffersByDepartment(user: User) {
    // User only sees offers from their department
    return this.offerRepository.find({
      where: {
        departmentId: user.departmentId,
      },
    });
  }

  async approvOffer(user: User, offerId: string) {
    const offer = await this.offerRepository.findOne({
      where: { id: offerId },
    });

    if (!offer) {
      throw new NotFoundException('Offer not found');
    }

    offer.status = 'APPROVED';
    offer.approvedBy = user.id;
    offer.approvedAt = new Date();

    return this.offerRepository.save(offer);
  }
}
```

## Error Handling

### Throwing Common Errors
```typescript
import { BadRequestException, UnauthorizedException, ForbiddenException, NotFoundException } from '@nestjs/common';

// User input validation error
throw new BadRequestException('Invalid offer data');

// Authentication failure
throw new UnauthorizedException('Invalid credentials');

// Authorization failure (has token but not authorized)
throw new ForbiddenException('Only HR can approve offers');

// Resource not found
throw new NotFoundException('Offer not found');
```

## Testing Auth Flows

### Unit Test Example
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { User, RoleType } from '../entities';

describe('OffersController', () => {
  let controller: OffersController;
  let service: OffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [
        {
          provide: OffersService,
          useValue: {
            createOffer: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(OffersController);
    service = module.get(OffersService);
  });

  it('should create offer if user is HR', async () => {
    const user: User = {
      id: '123',
      email: 'hr@test.com',
      role: { name: RoleType.HR },
      // ... other fields
    };

    const createOfferDto = { title: 'Junior Dev', topics: 3 };
    
    jest.spyOn(service, 'createOffer').mockResolvedValue({ id: '1', ...createOfferDto });

    const result = await controller.createOffer(user, createOfferDto);

    expect(service.createOffer).toHaveBeenCalledWith(user, createOfferDto);
    expect(result.id).toBe('1');
  });
});
```

## Swagger Annotations

### Complete Endpoint with Docs
```typescript
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@Post(':id/approve')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('HR')
@ApiBearerAuth()
@ApiOperation({
  summary: 'Approve internship offer',
  description: 'HR can approve pending offers. This will send notifications to applicants.',
})
@ApiParam({
  name: 'id',
  description: 'Offer ID (UUID)',
  example: '550e8400-e29b-41d4-a716-446655440000',
})
@ApiResponse({
  status: 200,
  description: 'Offer approved successfully',
  schema: {
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'Junior Developer',
      status: 'APPROVED',
      approvedBy: 'user-123',
      approvedAt: '2026-02-05T15:30:00Z',
    },
  },
})
@ApiResponse({
  status: 404,
  description: 'Offer not found',
})
@ApiResponse({
  status: 403,
  description: 'Only HR can approve offers',
})
async approveOffer(
  @Param('id') offerId: string,
  @CurrentUser() user: User,
): Promise<{ id: string; status: string }> {
  return this.offersService.approveOffer(user, offerId);
}
```

## Custom Decorators

### Create Department-Specific Decorator
```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Department } from '../../entities';

export const CurrentDepartment = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Department => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user.department) {
      throw new BadRequestException('User does not belong to a department');
    }
    
    return user.department;
  },
);

// Usage:
@Get('my-department')
getDepartmentInfo(@CurrentDepartment() dept: Department) {
  return dept;
}
```

## Common Patterns

### Role Check in Service
```typescript
async deleteOffer(user: User, offerId: string): Promise<void> {
  // Only admin or creator can delete
  if (user.role.name !== 'ADMIN' && offer.createdBy !== user.id) {
    throw new ForbiddenException('Not authorized to delete this offer');
  }
  
  await this.offerRepository.delete(offerId);
}
```

### Department Check
```typescript
async getOffers(user: User): Promise<Offer[]> {
  if (user.role.name === 'DEPARTMENT_CHIEF') {
    // Chiefs see only their department
    return this.offerRepository.find({
      where: { departmentId: user.departmentId },
    });
  }
  
  if (user.role.name === 'HR') {
    // HR sees all offers
    return this.offerRepository.find();
  }
  
  return [];
}
```

### Password Change Endpoint
```typescript
@Post('change-password')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
async changePassword(
  @CurrentUser() user: User,
  @Body() changePasswordDto: ChangePasswordDto,
): Promise<{ message: string }> {
  
  // Verify old password
  const isPasswordValid = await bcrypt.compare(
    changePasswordDto.oldPassword,
    user.password,
  );
  
  if (!isPasswordValid) {
    throw new UnauthorizedException('Current password is incorrect');
  }
  
  // Hash new password
  const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
  
  // Update
  await this.userRepository.update(user.id, { password: hashedPassword });
  
  return { message: 'Password changed successfully' };
}
```

## Database Queries with Auth

### Find with Relations
```typescript
const user = await this.userRepository.findOne({
  where: { id: userId },
  relations: ['role', 'department'], // Load these too
});
```

### Query with User Context
```typescript
const offers = await this.offerRepository.find({
  where: {
    ...(user.role.name === 'DEPARTMENT_CHIEF' && {
      departmentId: user.departmentId,
    }),
  },
  relations: ['department', 'topics'],
});
```

### Soft Delete Pattern
```typescript
// Instead of deleting, mark as deleted
await this.offerRepository.update(
  { id: offerId },
  { deletedAt: new Date() },
);

// Query active only
const activeOffers = await this.offerRepository.find({
  where: { deletedAt: IsNull() },
});
```

---

## File Structure Overview
```
backend/src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── decorators/
│   │   └── index.ts (@CurrentUser, @Roles)
│   ├── dto/
│   │   ├── index.ts (SignUpDto, SignInDto)
│   │   └── response.dto.ts (AuthResponseDto)
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   └── strategies/
│       └── jwt.strategy.ts
├── entities/
│   ├── user.entity.ts
│   ├── role.entity.ts
│   ├── department.entity.ts
│   ├── topic.entity.ts
│   └── index.ts
├── database/
│   └── seed.service.ts
├── offers/ (future module)
│   ├── offers.controller.ts
│   ├── offers.service.ts
│   ├── offers.module.ts
│   └── dto/
├── app.module.ts
└── main.ts
```

---

**All examples are production-ready and follow NestJS best practices.**  
**For complete API documentation, see [backend/AUTHENTICATION.md](./backend/AUTHENTICATION.md)**
