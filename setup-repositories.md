# 🚀 Quick Repository Setup Commands

## Prerequisites
1. Create these repositories on GitHub:
   - `capsort-frontend` (or use existing)
   - `capsort-monorepo` (new)

2. Replace `yourusername` with your actual GitHub username in the commands below

---

## 📦 Setup Frontend Repository (Separate)

```bash
# Navigate to frontend folder
cd frontend

# Check if git is already initialized
git status

# If not initialized, initialize git
git init

# Add all files
git add .

# Commit
git commit -m "CapSort Frontend - Production ready with authentication"

# Set main branch
git branch -M main

# Add remote (replace yourusername with your GitHub username)
git remote add origin https://github.com/yourusername/capsort-frontend.git

# Push to GitHub
git push -u origin main

# Go back to root
cd ..
```

---

## 📦 Setup Monorepo Repository (Both Frontend + Backend)

```bash
# Make sure you're in the root directory
# C:\Users\Janelle Silmaro\CAPSORT_FRONT_BACK

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "CapSort Monorepo - Full stack application ready for deployment"

# Set main branch
git branch -M main

# Add remote (replace yourusername with your GitHub username)
git remote add origin https://github.com/yourusername/capsort-monorepo.git

# Push to GitHub
git push -u origin main
```

---

## ✅ Verification

After pushing, verify:

### Frontend Repository
```bash
cd frontend
git remote -v
# Should show: origin  https://github.com/yourusername/capsort-frontend.git
```

### Monorepo Repository
```bash
cd ..
git remote -v
# Should show: origin  https://github.com/yourusername/capsort-monorepo.git
```

---

## 🌐 Deploy to Vercel

### Option 1: Deploy Frontend from Frontend Repo
1. Go to [vercel.com](https://vercel.com)
2. New Project → Import `capsort-frontend`
3. Framework: Vite
4. Root Directory: `/` (root)
5. Build Command: `npm run build`
6. Output Directory: `build`
7. Environment Variable: `VITE_API_URL=https://your-backend-url.vercel.app/api`

### Option 2: Deploy Backend from Monorepo
1. Go to [vercel.com](https://vercel.com)
2. New Project → Import `capsort-monorepo`
3. Framework: Other
4. Root Directory: `backend`
5. Build Command: `npm run build`
6. Set all backend environment variables
7. Deploy

### Option 3: Deploy Frontend from Monorepo (Alternative)
1. New Project → Import `capsort-monorepo`
2. Framework: Vite
3. Root Directory: `frontend`
4. Build Command: `npm run build`
5. Output Directory: `build`
6. Environment Variable: `VITE_API_URL`

---

## 🔄 Updating Code

### When you update frontend:
```bash
# Update in monorepo
cd frontend
# Make changes...
git add .
git commit -m "Update: description"
git push origin main

# Also push to frontend repo
cd ..
cd frontend
git add .
git commit -m "Update: description"
git push origin main
```

### When you update backend:
```bash
# Update in monorepo only
cd backend
# Make changes...
git add .
git commit -m "Update: description"
cd ..
git push origin main
```

---

## 📝 Important Notes

1. **Frontend has TWO homes**: 
   - Standalone repo: `capsort-frontend`
   - Inside monorepo: `capsort-monorepo/frontend`

2. **Backend has ONE home**:
   - Inside monorepo: `capsort-monorepo/backend`

3. **Deployment flexibility**:
   - Deploy frontend from either repository
   - Deploy backend from monorepo only
   - Choose what works best for your workflow

---

## ✅ Ready to Push!

Run the commands above to push your code to GitHub, then deploy to Vercel! 🚀