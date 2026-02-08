# Authentication System Documentation

## Overview

This is a production-ready authentication system for the ISS Orange platform built with NestJS, PostgreSQL, and JWT. It supports two primary user roles with role-based access control (RBAC).

## Features

✅ **Role-Based Access Control (RBAC)**
- HR: Can approve/decline offers across all departments
- Department Chief: Can create offers for their department
- Admin: Full system access

✅ **Security Features**
- Bcrypt password hashing
- JWT access tokens (1 hour expiration)
- Refresh tokens (configurable, default 7 days)
- Password validation (8+ chars, uppercase, lowercase, number, special character)
- Email normalization and uniqueness
- Account deactivation capabilities
- Refresh token revocation on logout

✅ **Database Design**
- Users table with audit fields (createdAt, updatedAt, lastLogin)
- Roles table with enum-based role types
- Departments table for organizational structure
- Topics table for department-specific topics (max 3 per offer)

✅ **API Features**
- Fully documented Swagger/OpenAPI endpoints
- Input validation with class-validator
- Error handling with descriptive messages
- CORS configuration for frontend integration
- Docker-ready setup

## Default Test Users

The system automatically creates these users on startup:

### HR User
```
Email: hr@orange.com
Password: SecurePass123!
Role: HR
```

### Department Chief (Engineering)
```
Email: chief@orange.com
Password: SecurePass123!
Role: DEPARTMENT_CHIEF
Department: Engineering
```

## API Endpoints

### Authentication
All endpoints located at `/auth`

#### 1. Sign Up
```
POST /auth/sign-up
```

**Request body:**
```json
{
  "email": "newuser@orange.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "SecurePass123!",
  "role": "HR",
  "departmentId": "optional-uuid"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "newuser@orange.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": {
      "id": "uuid",
      "name": "HR"
    },
    "department": null
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 3600
}
```

#### 2. Sign In
```
POST /auth/sign-in
```

**Request body:**
```json
{
  "email": "hr@orange.com",
  "password": "SecurePass123!"
}
```

**Response:** Same as Sign Up

#### 3. Refresh Token
```
POST /auth/refresh-token
```

**Request body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 3600
}
```

#### 4. Get Current User Profile
```
GET /auth/profile
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "hr@orange.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "fullName": "Jane Smith",
  "role": {
    "id": "uuid",
    "name": "HR",
    "description": "HR team member..."
  },
  "department": null,
  "isActive": true,
  "lastLogin": "2026-02-05T15:21:00Z",
  "createdAt": "2026-02-05T15:20:00Z"
}
```

#### 5. Logout
```
POST /auth/logout
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "message": "Successfully logged out"
}
```

## Testing in Postman

### Setup

1. **Create Environment Variables:**
   - `base_url`: `http://localhost:3000`
   - `access_token`: (set after login)
   - `refresh_token`: (set after login)

### Test Flow

**1. Sign In**
- Request: `POST {{base_url}}/auth/sign-in`
- Body:
  ```json
  {
    "email": "hr@orange.com",
    "password": "SecurePass123!"
  }
  ```
- In Tests tab, add:
  ```javascript
  pm.environment.set("access_token", pm.response.json().accessToken);
  pm.environment.set("refresh_token", pm.response.json().refreshToken);
  ```

**2. Get Profile**
- Request: `GET {{base_url}}/auth/profile`
- Headers:
  - `Authorization`: `Bearer {{access_token}}`

**3. Get New Tokens**
- Request: `POST {{base_url}}/auth/refresh-token`
- Body:
  ```json
  {
    "refreshToken": "{{refresh_token}}"
  }
  ```

**4. Logout**
- Request: `POST {{base_url}}/auth/logout`
- Headers:
  - `Authorization`: `Bearer {{access_token}}`

## Testing in Swagger UI

1. Start the application: `docker-compose up --build`
2. Navigate to `http://localhost:3000/api/docs`
3. Click the "Authorize" button (🔒)
4. After sign-in, paste the `accessToken` in the Bearer token field
5. All subsequent requests will automatically include the token

## Password Requirements

Passwords must be:
- At least 8 characters long
- Contain at least one uppercase letter (A-Z)
- Contain at least one lowercase letter (a-z)
- Contain at least one number (0-9)
- Contain at least one special character (@$!%*?&)

**Example valid passwords:**
- `SecurePass123!`
- `Orange@2026abc`
- `Platform$Auth1`

## Protected Routes Example

To protect routes with JWT and RBAC:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles, CurrentUser } from '../auth/decorators';
import { User } from '../entities';

@Controller('offers')
@UseGuards(JwtAuthGuard)
export class OffersController {
  
  // Only HR can view all offers
  @Get()
  @UseGuards(RolesGuard)
  @Roles('HR')
  getAllOffers() {
    // Implementation
  }

  // Only Department Chiefs can create offers
  @Post()
  @UseGuards(RolesGuard)
  @Roles('DEPARTMENT_CHIEF')
  createOffer(@CurrentUser() user: User, @Body() createOfferDto: CreateOfferDto) {
    // Implementation - user is the authenticated user
  }
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  roleId UUID FOREIGN KEY,
  departmentId UUID FOREIGN KEY (NULLABLE),
  isActive BOOLEAN DEFAULT true,
  refreshToken VARCHAR(255) NULLABLE,
  lastLogin TIMESTAMP NULLABLE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Roles Table
```sql
CREATE TABLE roles (
  id UUID PRIMARY KEY,
  name ENUM('HR', 'DEPARTMENT_CHIEF', 'ADMIN') UNIQUE NOT NULL,
  description TEXT NULLABLE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Departments Table
```sql
CREATE TABLE departments (
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NULLABLE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Topics Table
```sql
CREATE TABLE topics (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NULLABLE,
  departmentId UUID FOREIGN KEY NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_department CHECK (count(*) <= 3 per department)
)
```

## Environment Variables

Required in `.env`:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=iss_orange
DATABASE_USER=iss_user
DB_PASSWORD=your_secure_password

# Auth
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRATION=7d

# Server
PORT=3000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:4200
API_URL=http://localhost:3000
```

## Error Handling

All endpoints return meaningful error responses:

**400 Bad Request** - Invalid input
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

**401 Unauthorized** - Invalid credentials
```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

**403 Forbidden** - Insufficient permissions
```json
{
  "statusCode": 403,
  "message": "You do not have permission to access this resource. Required roles: HR",
  "error": "Forbidden"
}
```

## Security Best Practices Implemented

✅ **Password Security**
- Bcrypt hashing with salt rounds
- Password validation rules enforced
- Passwords never returned in responses

✅ **Token Security**
- Short-lived access tokens (1 hour)
- Refresh tokens stored in database
- Tokens can be revoked on logout

✅ **Data Protection**
- Password fields automatically excluded from API responses
- Email normalization prevents duplicate accounts
- Account deactivation without data loss

✅ **API Security**
- CORS configuration
- Input validation on all endpoints
- SQL injection prevention via TypeORM
- Request size limits

## Extending the System

### Adding a New Role

Edit `src/entities/role.entity.ts`:

```typescript
export enum RoleType {
  HR = 'HR',
  DEPARTMENT_CHIEF = 'DEPARTMENT_CHIEF',
  ADMIN = 'ADMIN',
  YOUR_NEW_ROLE = 'YOUR_NEW_ROLE', // Add here
}
```

Update seed data in `src/database/seed.service.ts`.

### Adding New Departments

Modify `seedDepartments()` in `src/database/seed.service.ts`.

### Creating Role-Protected Routes

```typescript
@Get('admin-panel')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
getAdminPanel() {
  // Only admins can access
}
```

## Performance Considerations

- JWT tokens are stateless (no database lookup needed for validation)
- Database queries are optimized with eager relations loading
- Password hashing uses salted rounds (10) - balance between security and performance
- Indexes automatically created on email (unique) and roleId (foreign key)

## Troubleshooting

**"role root does not exist"**
- Ensure DB_PASSWORD in .env matches database setup
- Run: `docker-compose down -v && docker-compose up --build`

**"Invalid token" on profile request**
- Ensure token is passed as: `Authorization: Bearer <token>`
- Token expiry might have passed - use refresh token endpoint

**CORS errors on frontend**
- Check FRONTEND_URL in .env matches your frontend origin
- Ensure Angular is running on the configured URL

**Password validation fails**
- Password must have: 8+ chars, uppercase, lowercase, number, special char
- Use the examples provided above

## Production Checklist

- [ ] Change default users and passwords
- [ ] Set strong JWT_SECRET (min 32 characters)
- [ ] Enable HTTPS in production
- [ ] Configure proper database backups
- [ ] Set NODE_ENV=production
- [ ] Use environment-specific .env files
- [ ] Enable rate limiting
- [ ] Add request logging/monitoring
- [ ] Implement password reset flow
- [ ] Add email verification for new accounts
- [ ] Set up automated security updates

## Next Steps

1. **Implement Offers Module** - Create, list, approve/decline offers
2. **Implement Applications Module** - Student applications for offers
3. **Add Email Notifications** - Send emails on signup, login, state changes
4. **Implement CV Upload & Parsing** - Process student CVs
5. **Add AI Module** - Integrate AI for shortlisting
6. **Implement Audit Logging** - Track all user actions

---

**Created by:** ISS Orange Development Team  
**Last Updated:** February 2026  
**Version:** 1.0.0
