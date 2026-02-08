# Architecture Diagram - ISS Orange Authentication System

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Angular)                           │
│                    :4200                                         │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/REST API
                         │
                    [CORS enabled]
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                 BACKEND (NestJS)                                 │
│                    :3000                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         HTTP Controllers Layer                           │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ AuthController                                     │  │   │
│  │  │ - POST /auth/sign-up                              │  │   │
│  │  │ - POST /auth/sign-in                              │  │   │
│  │  │ - POST /auth/refresh-token                        │  │   │
│  │  │ - GET  /auth/profile     [@JwtAuthGuard]          │  │   │
│  │  │ - POST /auth/logout      [@JwtAuthGuard]          │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                         │                                         │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │         Guards & Middleware Layer                       │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ JwtAuthGuard                                       │  │   │
│  │  │ - Validate bearer token                          │  │   │
│  │  │ - Load user from JWT payload                      │  │   │
│  │  │ - Return 401 if invalid                          │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ RolesGuard                                         │  │   │
│  │  │ - Check user role in @Roles() metadata            │  │   │
│  │  │ - Return 403 if unauthorized                      │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                         │                                         │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │         Business Logic Layer                            │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ AuthService                                        │  │   │
│  │  │ - signUp(dto)        → Create user + hash pwd     │  │   │
│  │  │ - signIn(dto)        → Validate + generate JWT    │  │   │
│  │  │ - refreshToken(dto)  → Verify + create new JWT   │  │   │
│  │  │ - getCurrentUser()   → Load user with relations   │  │   │
│  │  │ - logout()           → Revoke refresh token       │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ SeedService (runs on startup)                      │  │   │
│  │  │ - seedRoles()       → Create HR, CHIEF roles      │  │   │
│  │  │ - seedDepartments() → Create 5 departments        │  │   │
│  │  │ - seedUsers()       → Create test users           │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                         │                                         │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │         Persistence Layer                               │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ TypeORM Repositories                              │  │   │
│  │  │ - UserRepository     (save, find, update)        │  │   │
│  │  │ - RoleRepository     (find roles)                 │  │   │
│  │  │ - DepartmentRepository (find depts)              │  │   │
│  │  │ - TopicRepository    (manage topics)             │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ Entities                                           │  │   │
│  │  │ @Entity('users')          → User.entity.ts       │  │   │
│  │  │ @Entity('roles')          → Role.entity.ts       │  │   │
│  │  │ @Entity('departments')    → Department.entity.ts  │  │   │
│  │  │ @Entity('topics')         → Topic.entity.ts      │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────────┘
                         │ SQL Queries
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                   PostgreSQL Database                            │
│                  iss_orange:5432                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  users                                                   │   │
│  │  ├─ id (uuid, pk)                                       │   │
│  │  ├─ email (varchar, unique)                             │   │
│  │  ├─ password (varchar, bcrypt hashed)                   │   │
│  │  ├─ firstName, lastName                                 │   │
│  │  ├─ roleId (fk → roles)                                 │   │
│  │  ├─ departmentId (fk → departments, nullable)           │   │
│  │  ├─ isActive, lastLogin, refreshToken                   │   │
│  │  └─ createdAt, updatedAt                                │   │
│  │                                                          │   │
│  │  roles                                                   │   │
│  │  ├─ id (uuid, pk)                                       │   │
│  │  ├─ name (enum: HR, DEPARTMENT_CHIEF, ADMIN)           │   │
│  │  └─ description                                         │   │
│  │                                                          │   │
│  │  departments                                             │   │
│  │  ├─ id (uuid, pk)                                       │   │
│  │  ├─ name (varchar, unique)                              │   │
│  │  └─ description                                         │   │
│  │                                                          │   │
│  │  topics                                                  │   │
│  │  ├─ id (uuid, pk)                                       │   │
│  │  ├─ name (varchar)                                      │   │
│  │  ├─ departmentId (fk → departments)                     │   │
│  │  └─ description                                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Authentication Flow

```
CLIENT                          BACKEND                       DATABASE
  │                              │                              │
  ├──POST /auth/sign-in────────→ │                              │
  │  {email, password}           │                              │
  │                              ├──SELECT * FROM users───────→ │
  │                              │  WHERE email = ?             │
  │                              │← User record                 │
  │                              │                              │
  │                              │ [bcrypt.compare()]           │
  │                              │ (verify password)            │
  │                              │                              │
  │                              │ [jwtService.sign()]          │
  │                              │ (create JWT tokens)          │
  │                              │                              │
  │                              ├──UPDATE users SET───────────→│
  │                              │  lastLogin, refreshToken     │
  │                              │                              │
  │← {accessToken, refreshToken} │                              │
  │   {user, expiresIn}          │                              │
  │                              │                              │
  ├──GET /auth/profile─────────→ │                              │
  │  Header: Bearer accessToken  │ [jwt.verify(token)]          │
  │                              │ (validate signature & exp)   │
  │                              │                              │
  │                              ├──SELECT * FROM users───────→ │
  │                              │  WHERE id = payload.sub      │
  │                              │← User with relations         │
  │                              │  (role, department)          │
  │                              │                              │
  │← {id, email, role, ...}      │                              │
  │                              │                              │
  ├──POST /auth/logout──────────→ │                              │
  │  Header: Bearer accessToken  │                              │
  │                              ├──UPDATE users SET───────────→│
  │                              │  refreshToken = NULL         │
  │                              │                              │
  │← {message: "logged out"}     │                              │
```

## JWT Token Structure

```
Access Token (1 hour)
┌─────────────────────────────────────────────────────────┐
│ HEADER                                                   │
│ {                                                        │
│   "alg": "HS256",                                       │
│   "typ": "JWT"                                          │
│ }                                                        │
└─────────────────────────────────────────────────────────┘
         • (period)
┌─────────────────────────────────────────────────────────┐
│ PAYLOAD                                                  │
│ {                                                        │
│   "sub": "user-uuid",          (user.id)               │
│   "email": "hr@orange.com",                            │
│   "role": "HR",                (user.role.name)        │
│   "iat": 1708350000,           (issued at)             │
│   "exp": 1708353600            (expires in 1h)         │
│ }                                                        │
└─────────────────────────────────────────────────────────┘
         • (period)
┌─────────────────────────────────────────────────────────┐
│ SIGNATURE (HMAC-SHA256)                                  │
│ HMACSHA256(                                              │
│   base64UrlEncode(header) + "." +                       │
│   base64UrlEncode(payload),                             │
│   "JWT_SECRET_KEY"                                      │
│ )                                                        │
└─────────────────────────────────────────────────────────┘
```

## Role-Based Access Control (RBAC)

```
Request with Token
     │
     ▼
[JwtAuthGuard]
  ├─ Valid token?
  │  └─ No → 401 Unauthorized
  │  └─ Yes → Load User + relations
     │
     ▼
[RolesGuard]
  ├─ @Roles() decorator present?
  │  └─ No → Continue (public route)
  │  └─ Yes → Check roles
     │
     ▼
[Role Check]
  ├─ user.role.name in allowed roles?
  │  └─ No → 403 Forbidden
  │  └─ Yes → Proceed to handler
     │
     ▼
[Route Handler]
  └─ @CurrentUser() user: User injected
     └─ user.role, user.department available
```

## File Organization

```
backend/
├── src/
│   ├── auth/                          ← Authentication Module
│   │   ├── auth.controller.ts         (5 endpoints)
│   │   ├── auth.service.ts            (main logic)
│   │   ├── auth.module.ts             (module config)
│   │   ├── decorators/
│   │   │   └── index.ts               (@CurrentUser, @Roles)
│   │   ├── dto/
│   │   │   ├── index.ts               (SignUpDto, SignInDto)
│   │   │   └── response.dto.ts        (Response models)
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts      (token validation)
│   │   │   ├── roles.guard.ts         (role check)
│   │   │   └── index.ts
│   │   └── strategies/
│   │       └── jwt.strategy.ts        (JWT validation logic)
│   │
│   ├── entities/                      ← Database Models
│   │   ├── user.entity.ts             (User model)
│   │   ├── role.entity.ts             (Role + enum)
│   │   ├── department.entity.ts       (Department)
│   │   ├── topic.entity.ts            (Topics)
│   │   └── index.ts
│   │
│   ├── database/                      ← Data Layer
│   │   └── seed.service.ts            (Auto-seed data)
│   │
│   ├── app.module.ts                  (App config + imports)
│   └── main.ts                        (Entry point + Swagger)
│
├── AUTHENTICATION.md                  ← API Reference
├── QUICK_REFERENCE.md                 ← Code Examples
└── README.md                          ← Setup Guide
```

## Technology Stack

```
┌────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                       │
│┌──────────────────────────────────────────────────────┐│
││ Angular 17+                                          ││
││ - HTTP Client for API calls                         ││
││ - Guards for route protection                       ││
││ - Interceptors for JWT attachment                  ││
││ - Services for auth state management                ││
└──────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────┘
                     API (REST/JSON)
┌────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                       │
│┌──────────────────────────────────────────────────────┐│
││ NestJS 10+                                           ││
││ ├─ Express.js (HTTP server)                         ││
││ ├─ Passport.js (authentication strategy)            ││
││ ├─ JWT (token generation & validation)              ││
││ ├─ bcrypt (password hashing)                        ││
││ ├─ class-validator (input validation)               ││
││ └─ Swagger (API documentation)                      ││
└──────────────────────────────────────────────────────┘│
│┌──────────────────────────────────────────────────────┐│
││ TypeORM (ORM Layer)                                  ││
││ ├─ Entity definitions                               ││
││ ├─ Repositories for database access                 ││
││ ├─ Query builder for complex queries                ││
││ └─ Relations/joins                                  ││
└──────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────┘
                    SQL Queries
┌────────────────────────────────────────────────────────┐
│                  DATABASE LAYER                        │
│┌──────────────────────────────────────────────────────┐│
││ PostgreSQL 14+                                       ││
││ ├─ ACID transactions                                ││
││ ├─ Foreign key constraints                          ││
││ ├─ Indexes on pk/fk columns                         ││
││ ├─ UUID primary keys                                ││
││ └─ Timestamp columns (audit trail)                  ││
└──────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────┘
```

## Data Relationships

```
┌──────────────┐
│    User      │
├──────────────┤
│ id (PK)◄─────┼─────────┐
│              │         │
│ roleId (FK)──┼──┐      │ (many-to-one)
│ departId(FK) │  │      │
│ email        │  │  ┌───▼───────┐
│ firstName    │  │  │   Role    │
│ lastName     │  │  ├───────────┤
│ password     │  │  │ id (PK)   │
│ isActive     │  │  │ name      │
│ refreshToken │  │  │ - HR      │
│ lastLogin    │  │  │ - DEPT_CH │
│ createdAt    │  │  │ - ADMIN   │
│ updatedAt    │  │  └───────────┘
│              │  │
└──────────────┘  │
                  │
          ┌───────┴────────────┐
          │                    │
     ┌────▼───────┐     ┌─────▼─────────┐
     │Department  │     │ (User rel.)   │
     ├────────────┤     │               │
     │ id (PK)    │◄────┤ Foreign Key   │
     │ name       │     │ departmentId  │
     │ descr.     │     └───────────────┘
     └────────────┘
          │
          │ (one-to-many)
          │
     ┌────▼─────────┐
     │    Topic     │
     ├──────────────┤
     │ id (PK)      │
     │ name         │
     │ departmentId │
     │ (FK)         │
     │ createdAt    │
     │ updatedAt    │
     └──────────────┘

Max 3 Topics per Department
(enforced in business logic)
```

## Security Layers

```
         Request
            │
            ▼
      ┌──────────────┐
      │   CORS       │ ← Allow only from frontend origin
      │   Check      │
      └──────────────┘
            │
            ▼
      ┌──────────────┐
      │   Input      │ ← Validate format, length, constraints
      │ Validation   │
      └──────────────┘
            │
            ▼
      ┌──────────────┐
      │    JWT       │ ← Verify signature, check expiration
      │  Validation  │
      └──────────────┘
            │
            ▼
      ┌──────────────┐
      │    Role      │ ← Check user has required role
      │    Check     │
      └──────────────┘
            │
            ▼
      ┌──────────────┐
      │   Route      │ ← Execute business logic
      │   Handler    │
      └──────────────┘
            │
            ▼
      ┌──────────────┐
      │  Database    │ ← TypeORM parameterized queries
      │   Query      │   (SQL injection prevention)
      └──────────────┘
            │
            ▼
      ┌──────────────┐
      │  Password    │ ← Bcrypt hashing (storage only)
      │  Security    │   (Hash comparison, never transmit)
      └──────────────┘
```

---

**This architecture ensures:**
- ✅ Separation of concerns
- ✅ Scalability
- ✅ Security at multiple layers
- ✅ Clear data flow
- ✅ Easy to test
- ✅ Production-ready
