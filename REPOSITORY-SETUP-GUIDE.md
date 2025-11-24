# 📦 CapSort Repository Setup Guide

## 🎯 Repository Strategy

You will have **TWO repositories**:

1. **Frontend Repository** (Separate) - For independent frontend deployment
2. **Monorepo Repository** (Combined) - Contains both frontend and backend

This gives you flexibility to:
- Deploy frontend independently from its own repo
- Deploy both together from the monorepo
- Maintain separate version control for frontend if needed

---

## 📁 Repository 1: Frontend Only (Already Exists)

### Repository Name: `capsort-frontend`
### GitHub URL: `https://github.com/yourusername/capsort-frontend`

This repository contains only the frontend code for independent deployment.

### Setup Steps:

```bash
# Navigate to your frontend folder
cd frontend

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "CapSort Frontend - Production ready"

# Set main branch
git branch -M main

# Add your existing frontend repository
git remote add origin https://github.com/yourusername/capsort-frontend.git

# Push
git push -u origin main
```

### Vercel Deployment (Frontend Only):
1. Go to [vercel.com](https://vercel.com)
2. Import `capsort-frontend` repository
3. Framework Preset: **Vite**
4. Root Directory: **/** (root)
5. Build Command: `npm run build`
6. Output Directory: `build`
7. Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

---

## 📁 Repository 2: Monorepo (Both Frontend + Backend)

### Repository Name: `capsort-monorepo` or `capsort-fullstack`
### GitHub URL: `https://github.com/yourusername/capsort-monorepo`

This repository contains both frontend and backend for unified deployment.

### Setup Steps:

```bash
# Navigate to your monorepo root (current directory)
cd C:\Users\Janelle Silmaro\CAPSORT_FRONT_BACK

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "CapSort Monorepo - Frontend + Backend ready for deployment"

# Set main branch
git branch -M main

# Add remote (create this new repository on GitHub first)
git remote add origin https://github.com/yourusername/capsort-monorepo.git

# Push
git push -u origin main
```

### Vercel Deployment (Monorepo):

#### Deploy Backend:
1. Go to [vercel.com](https://vercel.com)
2. Import `capsort-monorepo` repository
3. Framework Preset: **Other**
4. Root Directory: **backend**
5. Build Command: `npm run build`
6. Output Directory: (leave empty)
7. Environment Variables:
   ```
   DATABASE_URL=postgresql://neondb_owner:npg_3HsnAPQYzBm9@ep-floral-salad-adu0nkbs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   DIRECT_URL=postgresql://neondb_owner:npg_3HsnAPQYzBm9@ep-floral-salad-adu0nkbs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
   JWT_SECRET=b0a0eb521a4bef17d9fa3f30d28e13e833d1afc64205e2cdfca6a8cf4ecc7caa3601e49e58f9939a26bb58e99b088882813b89b4e8f42c6a19f73fd2887bd98b
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

#### Deploy Frontend (from monorepo):
1. Create another Vercel project from `capsort-monorepo`
2. Framework Preset: **Vite**
3. Root Directory: **frontend**
4. Build Command: `npm run build`
5. Output Directory: `build`
6. Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

---

## 🚀 Quick Setup Commands

### Step 1: Create GitHub Repositories

Go to GitHub and create these repositories:
1. `capsort-frontend` (if not already created)
2. `capsort-monorepo` (new repository)

### Step 2: Push Frontend Repository

```bash
# Navigate to frontend folder
cd frontend

# Initialize and push (if not already done)
git init
git add .
git commit -m "CapSort Frontend - Production ready"
git branch -M main
git remote add origin https://github.com/yourusername/capsort-frontend.git
git push -u origin main

# Go back to root
cd ..
```

### Step 3: Push Monorepo Repository

```bash
# In the root directory (CAPSORT_FRONT_BACK)
git init
git add .
git commit -m "CapSort Monorepo - Full stack application"
git branch -M main
git remote add origin https://github.com/yourusername/capsort-monorepo.git
git push -u origin main
```

---

## 📊 Repository Comparison

| Feature | Frontend Repo | Monorepo |
|---------|--------------|----------|
| **Contains** | Frontend only | Frontend + Backend |
| **Size** | Smaller | Larger |
| **Deployment** | Frontend only | Both or separate |
| **Use Case** | Independent frontend updates | Full stack deployment |
| **Flexibility** | High | Very High |

---

## 🎯 Recommended Workflow

### For Frontend Changes:
1. Make changes in `frontend/` folder
2. Test locally
3. Push to **both repositories**:
   ```bash
   # Push to frontend repo
   cd frontend
   git add .
   git commit -m "Update: description"
   git push origin main
   
   # Push to monorepo
   cd ..
   git add frontend/
   git commit -m "Update frontend: description"
   git push origin main
   ```

### For Backend Changes:
1. Make changes in `backend/` folder
2. Test locally
3. Push to **monorepo only**:
   ```bash
   git add backend/
   git commit -m "Update backend: description"
   git push origin main
   ```

### For Full Stack Changes:
1. Make changes in both folders
2. Test locally
3. Push to **monorepo**:
   ```bash
   git add .
   git commit -m "Update: description"
   git push origin main
   ```
4. Optionally push frontend changes to frontend repo

---

## 🔄 Keeping Repositories in Sync

### Option 1: Manual Sync (Recommended)
When you update frontend, manually push to both repos.

### Option 2: Git Subtree (Advanced)
Use git subtree to automatically sync frontend folder to frontend repo.

### Option 3: GitHub Actions (Automated)
Set up GitHub Actions to automatically sync frontend changes.

---

## 📝 .gitignore for Monorepo

Already created! The `.gitignore` in the root handles both projects.

---

## ✅ Checklist

### Before Pushing:
- [ ] Create `capsort-frontend` repository on GitHub (if not exists)
- [ ] Create `capsort-monorepo` repository on GitHub
- [ ] Update repository URLs in commands above
- [ ] Ensure `.env` files are in `.gitignore`
- [ ] Test build: `npm run build`

### After Pushing:
- [ ] Verify frontend repo has all frontend files
- [ ] Verify monorepo has both frontend and backend
- [ ] Deploy backend from monorepo to Vercel
- [ ] Deploy frontend from either repo to Vercel
- [ ] Test authentication flow
- [ ] Update CORS settings

---

## 🎉 Benefits of This Setup

1. **Flexibility**: Deploy frontend independently or with backend
2. **Version Control**: Separate history for frontend if needed
3. **Team Collaboration**: Frontend team can work independently
4. **Backup**: Two sources of truth for frontend code
5. **Deployment Options**: Multiple deployment strategies

---

## 🚀 Ready to Push!

Your repositories are ready. Follow the steps above to push to GitHub and deploy to Vercel!