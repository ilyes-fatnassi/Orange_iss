# 🧪 User Testing Guide - What to Expect

## 🚀 Starting the Application

### Step 1: Start Docker Desktop
Make sure Docker Desktop is running on your Windows machine.

### Step 2: Start All Services
Open PowerShell in the project folder and run:
```powershell
.\test-app.ps1
```

This starts:
- **PostgreSQL Database** (port 5432)
- **Backend API** (port 3000)
- **Frontend App** (port 4200)

Wait 2-3 minutes for everything to build and start (first time takes longer).

---

## 🌐 Opening the Application

**Open your browser and go to:** http://localhost:4200

You'll see the **Orange ISS Landing Page** with:
- Orange logo in the header
- Hero section with "Welcome to Orange Internships"
- Offers section
- Footer

---

## 📝 Creating a New Account

### Step 1: Navigate to Sign Up
- Click **"Create one"** link at the bottom of the page
- Or go directly to: http://localhost:4200/signup

### Step 2: Fill Out the Registration Form

**Example for HR Manager:**
```
First Name: Sarah
Last Name: Johnson
Email: sarah.johnson@orange.com
Password: MySecure123!
Account Type: HR Manager
```

**Example for Department Chief:**
```
First Name: Michael
Last Name: Chen
Email: michael.chen@orange.com
Password: SecurePass456!
Account Type: Department Chief
Department: Engineering  ← (This field appears when you select Department Chief)
```

### Step 3: Password Requirements ⚠️
Your password MUST have:
- ✅ At least 8 characters
- ✅ One uppercase letter (A-Z)
- ✅ One lowercase letter (a-z)
- ✅ One number (0-9)
- ✅ One special character (!, @, #, $, etc.)

**Good passwords:**
- `SecurePass123!`
- `Orange@Work2026`
- `MyAccount#789`

**Bad passwords (won't work):**
- `password` (too simple)
- `Password1` (no special character)
- `SHORT!1` (too short)

### Step 4: Complete Registration
1. Check the box: **"I agree to the Terms and Privacy Policy"**
2. Click **"Create Account"** button
3. Wait for the form to submit

### What Happens Next? ✅
- You'll be automatically logged in
- Redirected to `/dashboard`
- Your name appears in the top-right corner of the header
- You'll see "Dashboard" and other navigation links

---

## 🔐 Logging In (Existing Users)

### Step 1: Navigate to Login
- Go to http://localhost:4200/login
- Or click the user icon (👤) in the header

### Step 2: Use Pre-Created Demo Accounts

**Demo HR Account:**
```
Email: hr@orange.com
Password: SecurePass123!
```

**Demo Department Chief Account:**
```
Email: chief@orange.com
Password: SecurePass123!
```

### Step 3: Sign In
1. Enter your email and password
2. Click **"Sign In"** button
3. Wait for authentication

### What Happens Next? ✅
- You'll be redirected to `/dashboard`
- Your name shows in the header: "Jane Smith" or "John Doe"
- Logout button appears
- Navigation menu is visible

---

## 🧭 Navigating the Application

### When NOT Logged In (Guest)
You can access:
- **Home Page** (/)
- **Login Page** (/login)
- **Sign Up Page** (/signup)

### When Logged In (Authenticated)
You can access:
- **Dashboard** (/dashboard) - Protected route
- All public pages
- Your user info shows in header

### Header Changes Based on Login Status

**Not Logged In:**
```
[Orange Logo]  [Nav Links]  [Login Icon 👤]
```

**Logged In:**
```
[Orange Logo]  [Dashboard] [My Applications] [AI Feedback]  [Your Name] [Logout Icon]
```

---

## 🚪 Logging Out

**To log out:**
1. Click the user icon/logout button in the top-right header
2. You'll be logged out immediately
3. Redirected to the home page
4. Header returns to guest view (shows login icon)

---

## 🎯 What You Can Test

### Test 1: Full Registration Flow
1. ✅ Go to signup page
2. ✅ Fill all fields with valid data
3. ✅ Select a role (HR or Department Chief)
4. ✅ If Department Chief, select a department
5. ✅ Check the terms checkbox
6. ✅ Submit the form
7. ✅ Verify you're logged in and on dashboard
8. ✅ Check your name appears in header

### Test 2: Login with Demo Account
1. ✅ Go to login page
2. ✅ Use demo credentials: hr@orange.com / SecurePass123!
3. ✅ Click Sign In
4. ✅ Verify redirect to dashboard
5. ✅ Check user name shows: "Jane Smith"

### Test 3: Try Invalid Credentials
1. ✅ Go to login page
2. ✅ Enter wrong password
3. ✅ See error message: "Login failed. Please try again."
4. ✅ Try non-existent email
5. ✅ See appropriate error

### Test 4: Password Validation
1. ✅ Go to signup page
2. ✅ Try password: "weak" → Error shown
3. ✅ Try password: "NoNumber!" → Error shown
4. ✅ Try password: "no special123" → Error shown
5. ✅ Use valid password: "SecurePass123!" → Works ✓

### Test 5: Protected Routes
1. ✅ Open browser in incognito/private mode
2. ✅ Try to go to http://localhost:4200/dashboard
3. ✅ You should be redirected to /login
4. ✅ After login, you're redirected back to /dashboard

### Test 6: Navigation Flow
1. ✅ Start on home page
2. ✅ Click logo → returns to home
3. ✅ Click login → goes to /login
4. ✅ Login successfully
5. ✅ Click Dashboard link
6. ✅ Click logo → returns to home
7. ✅ Logout → returns to home

---

## 🔍 What You Should See

### ✅ Successful Sign Up
- **Loading State**: Button shows "Creating Account..."
- **Success**: Redirected to dashboard within 1-2 seconds
- **Header**: Shows your first and last name
- **URL**: Changes to http://localhost:4200/dashboard

### ✅ Successful Login  
- **Loading State**: Button shows "Signing in..."
- **Success**: Redirected to dashboard within 1-2 seconds
- **Header**: Shows user name from account
- **Navigation**: Dashboard link becomes active

### ✅ Successful Logout
- **Immediate**: No loading delay
- **Redirect**: Returns to home page
- **Header**: Shows login icon again
- **State**: Protected routes no longer accessible

### ❌ Failed Login (Wrong Password)
- **Error Message**: "Login failed. Please try again."
- **Red Box**: Error shown above form
- **Form**: Stays on login page
- **Fields**: Email remains filled, password cleared

### ❌ Failed Sign Up (Weak Password)
- **Error Message**: "Please fill in all required fields" or password validation error
- **Form**: Stays on signup page
- **Button**: Disabled if password too weak

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
**Problem**: Frontend can't reach http://localhost:3000  
**Check**: 
```powershell
docker-compose ps
docker-compose logs backend
```
**Fix**: Make sure backend container is running

### "Login failed" but credentials are correct
**Check**: Browser console (F12 → Console tab)  
**Fix**: 
1. Check backend logs: `docker-compose logs backend`
2. Verify database is running: `docker-compose ps`
3. Try restarting: `docker-compose restart backend`

### Page shows blank/white screen
**Check**: Browser console (F12)  
**Fix**: 
1. Hard refresh: Ctrl + Shift + R
2. Check frontend logs: `docker-compose logs frontend`
3. Verify frontend running: http://localhost:4200

### "Docker is not running"
**Problem**: Docker Desktop not started  
**Fix**: 
1. Open Docker Desktop application
2. Wait for it to show "Running"
3. Run `.\test-app.ps1` again

### Already logged in but see login page
**Problem**: Tokens might be invalid  
**Fix**: 
1. Open DevTools (F12) → Application tab
2. Find "Local Storage" → http://localhost:4200
3. Clear all items
4. Refresh page and login again

---

## 💡 Pro Tips

### Check If You're Logged In
Open browser DevTools (F12):
1. Go to **Application** tab
2. Expand **Local Storage**
3. Click **http://localhost:4200**
4. Look for:
   - `accessToken` - Your JWT token
   - `refreshToken` - For renewing access
   - `user` - Your user information

### View API Requests
Open browser DevTools (F12):
1. Go to **Network** tab
2. Perform login/signup
3. Look for requests to `localhost:3000`
4. Click on request to see details
5. Check Headers and Response

### Test Multiple Users
Use **Incognito/Private** windows:
- Regular window: User A logged in
- Incognito window: User B logged in
- Compare different role experiences

---

## 📊 Expected Behavior Summary

| Action | Expected Result | Redirect |
|--------|----------------|----------|
| Sign Up (valid) | Account created, logged in | → /dashboard |
| Sign Up (invalid) | Error message shown | Stays on /signup |
| Login (valid) | Successfully logged in | → /dashboard |
| Login (invalid) | Error message shown | Stays on /login |
| Logout | Logged out | → / (home) |
| Access /dashboard (guest) | Blocked | → /login |
| Access /dashboard (logged in) | Page loads | Stays on /dashboard |
| Click logo | Navigation | → / (home) |

---

## 🎓 Understanding the Application

### User Roles

**HR Manager:**
- Can manage all internship offers
- Full access to applications
- No department restriction

**Department Chief:**
- Manages internships for their department
- Creates offers for specific department
- Can see department-specific data

### Demo Accounts Details

| Email | Password | Role | Department | Name |
|-------|----------|------|------------|------|
| hr@orange.com | SecurePass123! | HR | None | Jane Smith |
| chief@orange.com | SecurePass123! | Department Chief | Engineering | John Doe |

---

## 🔄 Testing Workflow

### Complete Test Cycle (10 minutes)

1. **Start fresh** (2 min)
   ```powershell
   docker-compose down
   docker-compose up --build
   ```

2. **Test as guest** (1 min)
   - Visit home page
   - Check landing page loads
   - Try accessing /dashboard → redirected to login ✓

3. **Create new account** (2 min)
   - Go to signup
   - Fill form with new email
   - Submit and verify dashboard access ✓

4. **Logout and login** (2 min)
   - Logout → verify redirect to home ✓
   - Login with same email → verify dashboard access ✓

5. **Test demo accounts** (2 min)
   - Logout
   - Login as HR: hr@orange.com
   - Check name shows "Jane Smith" ✓
   - Logout
   - Login as Chief: chief@orange.com
   - Check name shows "John Doe" ✓

6. **Test errors** (1 min)
   - Try wrong password → error shown ✓
   - Try weak password on signup → validation works ✓

---

## ✅ Success Criteria

Your application is working if:
- ✅ You can access http://localhost:4200
- ✅ You can create a new account
- ✅ You can login with demo accounts
- ✅ You see your name in the header when logged in
- ✅ Dashboard is accessible when logged in
- ✅ Dashboard redirects to login when not logged in
- ✅ Logout works and returns you to home
- ✅ Password validation prevents weak passwords

---

## 📞 Need More Help?

**View backend API documentation:**
- Swagger UI: http://localhost:3000/api/docs

**Check technical testing guide:**
- See `TESTING_GUIDE.md` for API testing with Postman

**View logs in real-time:**
```powershell
docker-compose logs -f
```

**Stop everything:**
```powershell
docker-compose down
```

**Start fresh (delete all data):**
```powershell
docker-compose down -v
docker-compose up --build
```
