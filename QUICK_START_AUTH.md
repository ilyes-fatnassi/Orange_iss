# 🚀 Quick Start Guide - Authentication System

## Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ running
- Backend and Frontend folders ready

## Step 1: Install Dependencies

### Backend
```powershell
cd backend
npm install cookie-parser
npm install --save-dev @types/cookie-parser
```

### Frontend
```powershell
cd frontend
# All dependencies already installed
```

## Step 2: Database Setup

### Create Database
```sql
CREATE DATABASE orange_iss;
CREATE USER iss_user WITH PASSWORD 'changeme';
GRANT ALL PRIVILEGES ON DATABASE orange_iss TO iss_user;
```

### Configure Environment
Create `backend/.env`:
```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=iss_user
DATABASE_PASSWORD=changeme
DATABASE_NAME=orange_iss

# JWT
JWT_SECRET=your-super-secret-key-min-32-characters-long-change-this
JWT_EXPIRATION=15m

# Application
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:4200
```

### Run Database Migration
```powershell
cd backend

# TypeORM will auto-create tables with synchronize=true in development
# For production, generate and run migrations:
npm run migration:generate -- -n AuthSystemSetup
npm run migration:run
```

## Step 3: Seed Initial Data

The seed service will create initial roles automatically. To create first admin:

### Option A: Manual (Recommended for first admin)
```sql
-- Insert roles
INSERT INTO roles (id, name, description) VALUES 
  (gen_random_uuid(), 'HR_ADMIN', 'Human Resources Administrator'),
  (gen_random_uuid(), 'DEPT_CHIEF', 'Department Chief'),
  (gen_random_uuid(), 'SUPER_ADMIN', 'System Administrator'),
  (gen_random_uuid(), 'RECRUITER', 'Recruiter');

-- Get HR_ADMIN role ID
SELECT id FROM roles WHERE name = 'HR_ADMIN';

-- Insert first admin user (status=ACTIVE to skip activation)
INSERT INTO users (
  id, email, "firstName", "lastName", password, "roleId", 
  status, "createdAt", "updatedAt", "passwordChangedAt"
) VALUES (
  gen_random_uuid(),
  'admin@orange.com',
  'Admin',
  'User',
  -- Temporary password: "AdminPass123!" (hash it properly in production)
  '$pbkdf2-sha512$i=100000,l=64$generated-hash-here',
  '(paste-role-id-here)',
  'ACTIVE',
  NOW(),
  NOW(),
  NOW()
);
```

### Option B: Using Seed Service
Update `backend/src/database/seed.service.ts` to create admin:

```typescript
async seedInitialAdmin() {
  const hrAdminRole = await this.roleRepository.findOne({
    where: { name: RoleType.HR_ADMIN },
  });

  const existingAdmin = await this.userRepository.findOne({
    where: { email: 'admin@orange.com' },
  });

  if (!existingAdmin && hrAdminRole) {
    const tempPassword = await this.passwordService.hash('AdminPass123!');
    
    await this.userRepository.save({
      email: 'admin@orange.com',
      firstName: 'System',
      lastName: 'Administrator',
      password: tempPassword,
      roleId: hrAdminRole.id,
      status: 'ACTIVE',
      createdBy: null,
    });
    
    console.log('✅ Initial admin created: admin@orange.com / AdminPass123!');
  }
}
```

## Step 4: Start Services

### Backend
```powershell
cd backend
npm run start:dev

# Should see:
# 🚀 Application is running on: http://localhost:3000
# 📚 API Documentation: http://localhost:3000/api/docs
```

### Frontend
```powershell
cd frontend
ng serve

# Should see:
# ✔ Browser application bundle generation complete.
# ** Angular Live Development Server is listening on localhost:4200
```

## Step 5: Test Authentication

### Test in Browser
1. Go to `http://localhost:4200`
2. Click "Login"
3. Use credentials:
   - Email: `admin@orange.com`
   - Password: `AdminPass123!`

### Test in Swagger
1. Go to `http://localhost:3000/api/docs`
2. Try `/auth/login` endpoint
3. Copy access token
4. Click "Authorize" button, paste token

### Test with curl
```powershell
# Login
curl -X POST http://localhost:3000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@orange.com\",\"password\":\"AdminPass123!\"}' `
  -c cookies.txt

# Access protected endpoint
curl -X GET http://localhost:3000/api/auth/me `
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" `
  -b cookies.txt
```

## Step 6: Create Additional Users

### Via API (Requires HR_ADMIN token)
```typescript
POST /api/auth/register
Authorization: Bearer {HR_ADMIN_TOKEN}

{
  "email": "john.doe@orange.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "DEPT_CHIEF",
  "departmentId": "dept-uuid-here"
}

// Response includes activation link
{
  "userId": "user-uuid",
  "activationLink": "http://localhost:4200/activate?token=XXX",
  "expiresAt": "2026-02-10T..."
}
```

### User activates account:
```typescript
POST /api/auth/activate

{
  "token": "activation-token-from-email",
  "password": "SecurePass123!@#"
}
```

## Common Issues & Solutions

### ❌ "Cannot find module 'cookie-parser'"
```powershell
cd backend
npm install cookie-parser @types/cookie-parser
```

### ❌ "CORS error" or "Credentials not included"
- Check `main.ts` has `credentials: true` in CORS config
- Ensure Angular HTTP calls use `withCredentials: true`

### ❌ "Database connection failed"
- Verify PostgreSQL is running: `psql -U postgres -l`
- Check DATABASE_* variables in `.env`
- Ensure user has permissions: `GRANT ALL PRIVILEGES ON DATABASE orange_iss TO iss_user;`

### ❌ "Token reuse detected"
- Expected behavior when using old refresh token
- Clear cookies: `document.cookie.split(";").forEach(c => document.cookie = c.split("=")[0] + "=;expires=" + new Date(0).toUTCString())`

### ❌ "Account locked"
- Wait 30 minutes or unlock manually:
  ```sql
  UPDATE users SET status = 'ACTIVE', "failedLoginAttempts" = 0, "accountLockedUntil" = NULL WHERE email = 'user@orange.com';
  ```

### ❌ "refreshToken cookie not being set"
- Ensure backend uses `cookie-parser()`
- Check cookie settings (httpOnly, sameSite, secure)
- For localhost, `secure: false` is OK (production needs `true`)

## Testing Checklist

- [ ] Login with valid credentials → Success
- [ ] Login with invalid credentials → Error
- [ ] Login fail 5x → Account locked for 30 min
- [ ] Access `/api/auth/me` with token → User profile
- [ ] Access `/api/auth/me` without token → 401
- [ ] Token expires after 15 min → 401
- [ ] Refresh token → New access token
- [ ] Logout → Tokens revoked
- [ ] HR creates new user → Activation link generated
- [ ] User activates account → Account active
- [ ] Password reset request → Reset link sent
- [ ] Password reset confirm → Password changed

## Security Checklist

- [ ] JWT_SECRET is changed from default (32+ chars)
- [ ] Database password is changed from default
- [ ] HTTPS enabled in production (`secure: true` for cookies)
- [ ] Email service configured for activation/reset
- [ ] Rate limiting enabled on auth endpoints
- [ ] Audit logs being created
- [ ] Old tokens cleaned up periodically

## Architecture Reference

For detailed architecture, see:
- [AUTH_ARCHITECTURE.md](AUTH_ARCHITECTURE.md) - Complete specification
- [AUTH_IMPLEMENTATION_STATUS.md](AUTH_IMPLEMENTATION_STATUS.md) - Implementation details

## API Endpoints Summary

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | Admin | Create new user |
| `/api/auth/activate` | POST | Public | Activate account |
| `/api/auth/login` | POST | Public | User login |
| `/api/auth/refresh` | POST | Cookie | Refresh token |
| `/api/auth/logout` | POST | Public | Logout |
| `/api/auth/me` | GET | JWT | Current user |
| `/api/auth/password-reset/request` | POST | Public | Request reset |
| `/api/auth/password-reset/confirm` | POST | Public | Confirm reset |

## Support

For questions or issues:
1. Check [AUTH_ARCHITECTURE.md](AUTH_ARCHITECTURE.md) for design decisions
2. Check [AUTH_IMPLEMENTATION_STATUS.md](AUTH_IMPLEMENTATION_STATUS.md) for implementation details
3. Review Swagger docs at `http://localhost:3000/api/docs`
4. Check audit logs in database for security events

---

**Status**: ✅ Ready to Start  
**Next**: Follow Step 1 above  
**Time**: ~15 minutes for full setup
