# Quick Start - Authentication Testing

## Prerequisites
- Docker and Docker Compose running
- Postman or similar API testing tool
- Terminal/PowerShell

## Quick Setup (2 minutes)

1. **Restart Docker with fresh database:**
   ```powershell
   cd C:\Users\narug\Documents\ISS\Orange_iss
   docker-compose down
   docker volume rm orange_iss_postgres_data
   docker-compose up --build
   ```

2. **Wait for all services to be healthy:**
   - Database: `database system is ready to accept connections`
   - Backend: `No errors found`, should be listening on :3000
   - Frontend: `Application bundle generation complete`, should be on :4200

3. **Access the API:**
   - Swagger UI: http://localhost:3000/api/docs
   - Backend: http://localhost:3000
   - Frontend: http://localhost:4200

## Default Test Users (Auto-Created)

### HR User
- **Email:** hr@orange.com
- **Password:** SecurePass123!

### Department Chief
- **Email:** chief@orange.com  
- **Password:** SecurePass123!
- **Department:** Engineering

## Testing with Postman (5 minutes)

### 1. Create Collection
- Create new collection: "ISS Orange Auth"
- Create folder: "Authentication"

### 2. Create Sign-In Request
```
POST http://localhost:3000/auth/sign-in

Body (JSON):
{
  "email": "hr@orange.com",
  "password": "SecurePass123!"
}
```

After sending:
- Copy `accessToken` from response
- Go to Tests tab, add:
```javascript
pm.environment.set("access_token", pm.response.json().accessToken);
pm.environment.set("refresh_token", pm.response.json().refreshToken);
```

### 3. Test Protected Route
```
GET http://localhost:3000/auth/profile

Headers:
Authorization: Bearer {{access_token}}
```

### 4. Test Token Refresh
```
POST http://localhost:3000/auth/refresh-token

Body (JSON):
{
  "refreshToken": "{{refresh_token}}"
}
```

### 5. Test Logout
```
POST http://localhost:3000/auth/logout

Headers:
Authorization: Bearer {{access_token}}
```

## Testing with Swagger UI (3 minutes)

1. Open http://localhost:3000/api/docs
2. Find "Authentication" section
3. Click "Sign-in" → Try it out
4. Paste this JSON:
```json
{
  "email": "hr@orange.com",
  "password": "SecurePass123!"
}
```
5. Click Execute
6. Copy the `accessToken` from response
7. Click "Authorize" button (lock icon)
8. Paste token in format: `Bearer eyJhbGc...`
9. Now test other endpoints - token is automatically included

## Verify Everything Works

✅ **Sign-in returns tokens**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "expiresIn": 3600,
  "user": {...}
}
```

✅ **Profile accessible with token**
```
GET /auth/profile [200 OK]
Returns user details with role and department
```

✅ **Token refresh works**
```
POST /auth/refresh-token [200 OK]
Returns new tokens
```

✅ **Logout invalidates token**
```
POST /auth/logout [200 OK]
Returns success message
```

## Test Sign-Up (New User)

```
POST http://localhost:3000/auth/sign-up

Body:
{
  "email": "newuser@example.com",
  "firstName": "Test",
  "lastName": "User",
  "password": "ValidPass123!",
  "role": "HR"
}
```

**Response:** Full auth response with tokens

## Test Password Validation

Try these passwords:

**Invalid ❌**
- `short` - too short
- `NoNumbers!` - missing numbers
- `nouppercase123!` - missing uppercase
- `NOLOWERCASE123!` - missing lowercase
- `NoSpecial123` - missing special char

**Valid ✅**
- `SecurePass123!`
- `MyPassword@2026`
- `Platform$Auth1`
- `Orange#Tech123`

## Test Role-Based Access (Future)

Once role-protected endpoints are created:

```
# HR can access this
GET /offers?status=pending
Authorization: Bearer {hr_token}
[200 OK]

# Department Chief cannot
GET /offers?status=pending
Authorization: Bearer {chief_token}
[403 Forbidden - requires HR role]
```

## Database Tables Created

```
✓ roles
  - HR
  - DEPARTMENT_CHIEF
  - ADMIN

✓ departments
  - Engineering (example)
  - Marketing (example)
  - HR (example)
  - Finance (example)
  - Operations (example)

✓ users
  - hr@orange.com (HR role)
  - chief@orange.com (Department Chief, Engineering dept)

✓ topics
  - For department-specific topics (max 3 per offer)
```

## Monitor Logs

Check Docker logs for any issues:

```powershell
# View all logs
docker-compose logs

# View only backend
docker-compose logs backend

# View only database
docker-compose logs postgres

# Real-time logs
docker-compose logs -f backend
```

## Common Issues & Fixes

**"role root does not exist"**
- 🔧 Solution: `docker-compose down -v && docker-compose up --build`

**"connection refused" on port 3000**
- 🔧 Wait 10 seconds for backend to build and start
- Check: `docker-compose logs backend`

**"Invalid token" when using token**
- 🔧 Ensure Authorization header format: `Bearer {token}` (with space)
- Token expires in 1 hour - use refresh endpoint

**CORS errors in browser**
- 🔧 Already configured in code for localhost:4200
- Check .env FRONTEND_URL is correct

**Database already exists error**
- 🔧 Delete volume: `docker volume rm orange_iss_postgres_data`

## Next: Test Role-Protected Routes

Once you create new endpoints with `@Roles()` decorator:

```typescript
@Get('admin-only')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('HR')
getAdminData() {
  // Only HR can access
}
```

Test with:
1. HR token → 200 OK ✅
2. Chief token → 403 Forbidden ✅
3. No token → 401 Unauthorized ✅

---

**Status:** ✅ Authentication system ready for testing  
**Endpoints:** 5 (Sign-up, Sign-in, Refresh, Profile, Logout)  
**Users:** 2 (HR, Department Chief)  
**Ready for:** Offers module development
