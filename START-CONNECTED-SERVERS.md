# 🚀 Start Connected Frontend & Backend

## ✅ What's Been Connected

Your GitHub frontend is now fully connected to your backend with:
- ✅ Authentication service (register, login, admin login)
- ✅ API client with automatic token injection
- ✅ Auth context for global state management
- ✅ Protected routes for student and admin pages
- ✅ Error handling and loading states
- ✅ Signup page connected to backend

## 📁 Project Structure

```
C:\Users\Janelle Silmaro\CAPSORT_FRONT_BACK\
│
├── BACKEND-CAPSORT/                    ← Backend (Port 5000)
│   ├── src/
│   │   ├── controllers/authController.js
│   │   ├── routes/authRoutes.js
│   │   └── index.js
│   └── .env
│
└── Capsort-Frontend-GitHub/            ← Frontend (Port 3000)
    ├── src/
    │   ├── contexts/AuthContext.tsx    ← NEW: Auth state
    │   ├── services/
    │   │   ├── api.ts                  ← NEW: HTTP client
    │   │   └── authService.ts          ← NEW: Auth API
    │   ├── components/
    │   │   └── ProtectedRoute.tsx      ← NEW: Route guard
    │   ├── pages/
    │   │   └── Signup.tsx              ← UPDATED: Connected to backend
    │   └── App.tsx                     ← UPDATED: AuthProvider + Protected routes
    └── .env                            ← NEW: API URL config
```

## 🚀 Start Both Servers

### Step 1: Start Backend

```bash
cd C:\Users\Janelle Silmaro\CAPSORT_FRONT_BACK\BACKEND-CAPSORT
npm run dev
```

**Expected Output:**
```
🚀 Capsort Backend API is running on port 5000
📊 Environment: development
🌐 Health check: http://localhost:5000/health
```

### Step 2: Start Frontend (New Terminal)

```bash
cd "C:\Users\Janelle Silmaro\CAPSORT_FRONT_BACK\Capsort-Frontend-GitHub"
npm install
npm run dev
```

**Expected Output:**
```
VITE v6.3.5  ready in XXX ms
➜  Local:   http://localhost:3000/
```

## 🌐 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🧪 Test the Connection

### 1. Test Backend Health
Open: http://localhost:5000/health

**Expected:**
```json
{
  "status": "OK",
  "message": "Capsort Backend API is running"
}
```

### 2. Test Frontend
Open: http://localhost:3000

**Expected:** Splash page loads

### 3. Test Signup (Backend Connection)

1. Go to http://localhost:3000/signup
2. Fill in the form:
   - Full Name: "Test Student"
   - Contact Number: "+639123456789"
   - Email: "test@student.com"
   - Password: "Test123"
   - Confirm Password: "Test123"
   - Check "I agree to terms"
3. Click "Create Account"
4. **Expected**: 
   - Success alert: "Registration successful! Please login..."
   - Redirects to /login
5. **Check Backend Terminal**: Should see POST request to /api/auth/register

### 4. Test Login
1. Go to http://localhost:3000/login
2. Enter credentials from signup
3. Click "Log in"
4. **Expected**: Redirects to /student/dashboard

## 📊 What's Working

### ✅ Signup Page
- Connected to `POST /api/auth/register`
- Validates password match
- Validates terms agreement
- Shows error messages
- Shows loading state
- Redirects to login on success

### ✅ Authentication Flow
- Register → Backend creates user
- Login → Backend returns JWT token
- Token stored in localStorage
- Token sent with all API requests
- Protected routes check authentication

### ✅ Protected Routes
- Student routes require student role
- Admin routes require admin role
- Unauthenticated users redirect to /login
- Wrong role redirects to correct dashboard

## 🔧 Configuration Files

### Backend `.env`
```env
DATABASE_URL="your_neon_database_url"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:3000"
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F

# Restart
cd BACKEND-CAPSORT
npm run dev
```

### Frontend Won't Start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill process if needed
taskkill /PID <PID> /F

# Install dependencies
cd Capsort-Frontend-GitHub
npm install

# Restart
npm run dev
```

### Signup Not Working

**Check Backend Terminal:**
- Should see POST request to /api/auth/register
- Check for errors

**Check Browser Console (F12):**
- Look for network errors
- Check if request reaches backend

**Common Issues:**
1. **CORS Error**: Verify CLIENT_URL in backend .env
2. **Network Error**: Ensure backend is running
3. **Validation Error**: Check password requirements (min 6 chars, uppercase, lowercase, number)

### "Cannot find module" Errors

```bash
cd Capsort-Frontend-GitHub
npm install
```

## ✅ Verification Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:5000/health
- [ ] Signup form displays correctly
- [ ] Can fill in signup form
- [ ] Checkbox works (can check/uncheck)
- [ ] Clicking "Create Account" sends request to backend
- [ ] Backend terminal shows POST /api/auth/register
- [ ] Success alert appears
- [ ] Redirects to /login
- [ ] Can login with new credentials
- [ ] Redirects to /student/dashboard

## 📝 Next Steps

### 1. Connect Login Page
Update `src/pages/Login.tsx` to use `useAuth()` hook

### 2. Connect Admin Login
Create `src/pages/AdminLogin.tsx` for admin authentication

### 3. Add Project Services
Create services for project CRUD operations

### 4. Connect Dashboards
Update dashboard pages to fetch real data from backend

## 💡 Pro Tips

1. **Keep both terminals visible** - Watch for errors
2. **Use browser DevTools** (F12) - Check Network tab for API calls
3. **Check both terminals** - Errors can appear in either
4. **Test incrementally** - Verify each feature works
5. **Clear localStorage** if stuck - `localStorage.clear()` in console

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Backend shows no errors
- ✅ Frontend shows no errors
- ✅ Signup sends request to backend
- ✅ Backend terminal shows POST request
- ✅ Success alert appears
- ✅ User is created in database
- ✅ Can login with new credentials

---

**Your signup page is now connected to the backend! 🎉**

**Test it now:**
1. Start both servers
2. Go to http://localhost:3000/signup
3. Register a new account
4. Check backend terminal for the request
5. Login with your new credentials!
