# 🚀 CapSort Monorepo Deployment Guide

## 📁 Monorepo Structure

This project is now organized as a monorepo with both frontend and backend in a single repository:

```
capsort-monorepo/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express backend
├── package.json       # Monorepo scripts
└── README.md
```

## ✅ Pre-Deployment Checklist

Both frontend and backend are ready for deployment:

- ✅ **Frontend Build**: `npm run build:frontend` works successfully
- ✅ **Backend Ready**: Node.js backend ready for deployment
- ✅ **Authentication**: Fully integrated and working
- ✅ **Database**: Neon PostgreSQL configured
- ✅ **Environment Variables**: Configured for production
- ✅ **Monorepo Setup**: Single repository with both projects

## 🚀 Deployment Options

### Option 1: Vercel Monorepo (Recommended)

Deploy both frontend and backend from the same repository using Vercel's monorepo support.

#### Step 1: Push to GitHub
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit - CapSort monorepo ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/capsort-monorepo.git
git push -u origin main
```

#### Step 2: Deploy Backend to Vercel
1. Go to [vercel.com](https://vercel.com) and click "New Project"
2. Import your GitHub repository
3. **Framework Preset**: Other
4. **Root Directory**: `backend`
5. **Build Command**: `npm run build`
6. **Output Directory**: Leave empty (Node.js project)
7. **Install Command**: `npm install`

**Environment Variables for Backend**:
```
DATABASE_URL=postgresql://neondb_owner:npg_3HsnAPQYzBm9@ep-floral-salad-adu0nkbs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_3HsnAPQYzBm9@ep-floral-salad-adu0nkbs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=b0a0eb521a4bef17d9fa3f30d28e13e833d1afc64205e2cdfca6a8cf4ecc7caa3601e49e58f9939a26bb58e99b088882813b89b4e8f42c6a19f73fd2887bd98b
JWT_EXPIRES_IN=7d
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.vercel.app
```

#### Step 3: Deploy Frontend to Vercel
1. Create another Vercel project from the same repository
2. **Framework Preset**: Vite
3. **Root Directory**: `frontend`
4. **Build Command**: `npm run build`
5. **Output Directory**: `build`
6. **Install Command**: `npm install`

**Environment Variables for Frontend**:
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

#### Step 4: Update CORS Settings
After both are deployed, update the backend's `CLIENT_URL` environment variable with the actual frontend URL.

### Option 2: Separate Repositories

If you prefer separate repositories:

#### Frontend Repository
```bash
# Create frontend-only repository
mkdir capsort-frontend
cp -r frontend/* capsort-frontend/
cd capsort-frontend
git init
git add .
git commit -m "Frontend deployment ready"
git remote add origin https://github.com/yourusername/capsort-frontend.git
git push -u origin main
```

#### Backend Repository
```bash
# Create backend-only repository
mkdir capsort-backend
cp -r backend/* capsort-backend/
cd capsort-backend
git init
git add .
git commit -m "Backend deployment ready"
git remote add origin https://github.com/yourusername/capsort-backend.git
git push -u origin main
```

## 📦 Frontend Deployment Details

### 1. Deploy Frontend to Vercel

1. **Push to GitHub** (if not already done):
   ```bash
   cd Capsort-Frontend-GitHub
   git init
   git add .
   git commit -m "Initial commit - ready for deployment"
   git branch -M main
   git remote add origin https://github.com/yourusername/capsort-frontend.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Set environment variables in Vercel dashboard:
     - `VITE_API_URL` = `https://your-backend-url.vercel.app/api`

3. **Build Settings** (Auto-detected):
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### 2. Deploy Backend to Vercel

1. **Create vercel.json for backend**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "src/index.js"
       }
     ]
   }
   ```

2. **Environment Variables** (Set in Vercel dashboard):
   ```
   DATABASE_URL=your_neon_database_url
   DIRECT_URL=your_neon_database_url
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

3. **Deploy Backend**:
   - Push backend to separate GitHub repo
   - Deploy to Vercel
   - Update frontend `VITE_API_URL` with backend URL

## 🔧 Configuration Files Created

### Frontend
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `.env.production` - Production environment template
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `src/vite-env.d.ts` - Type definitions

### Backend
- ✅ Ready for deployment as-is
- ✅ All environment variables configured
- ✅ Database connection working

## 🌐 Environment Variables

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### Backend (Vercel Environment Variables)
```env
DATABASE_URL=postgresql://neondb_owner:npg_3HsnAPQYzBm9@ep-floral-salad-adu0nkbs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_3HsnAPQYzBm9@ep-floral-salad-adu0nkbs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=b0a0eb521a4bef17d9fa3f30d28e13e833d1afc64205e2cdfca6a8cf4ecc7caa3601e49e58f9939a26bb58e99b088882813b89b4e8f42c6a19f73fd2887bd98b
JWT_EXPIRES_IN=7d
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.vercel.app
```

## 🚀 Deployment Steps

### Step 1: Deploy Backend First
1. Create new GitHub repo for backend
2. Push BACKEND-CAPSORT folder contents
3. Deploy to Vercel
4. Set environment variables
5. Note the deployed URL

### Step 2: Deploy Frontend
1. Update `.env.production` with backend URL
2. Create new GitHub repo for frontend  
3. Push Capsort-Frontend-GitHub folder contents
4. Deploy to Vercel
5. Set VITE_API_URL environment variable

### Step 3: Update CORS
1. Update backend CLIENT_URL with frontend URL
2. Redeploy backend

## ✅ Post-Deployment Checklist

- [ ] Backend health check: `https://your-backend.vercel.app/health`
- [ ] Frontend loads: `https://your-frontend.vercel.app`
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard loads
- [ ] API calls work (check browser network tab)

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: Update CLIENT_URL in backend environment variables
2. **API Not Found**: Check VITE_API_URL in frontend environment variables
3. **Database Connection**: Verify DATABASE_URL is correct
4. **Build Failures**: Check build logs in Vercel dashboard

### Debug Commands:
```bash
# Test frontend build locally
cd Capsort-Frontend-GitHub
npm run build

# Test backend locally
cd BACKEND-CAPSORT
npm start
```

## 📱 Features Ready for Production

### ✅ Authentication System
- User registration with validation
- Student and admin login
- JWT token management
- Protected routes
- Auto-redirect to dashboards

### ✅ Backend API
- RESTful API endpoints
- Database integration (Neon PostgreSQL)
- Security middleware
- Error handling
- CORS configuration

### ✅ Frontend Application
- React with TypeScript
- Responsive design
- Route protection
- State management
- API integration

## 🎉 Ready for Integration

The application is now ready for:
- ✅ User authentication
- ✅ Project management features
- ✅ File upload functionality
- ✅ Search and filtering
- ✅ Admin dashboard features
- ✅ Student dashboard features

All authentication is working and the foundation is solid for adding the remaining features!