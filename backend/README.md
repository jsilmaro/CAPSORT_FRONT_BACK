# Capsort Backend API

Backend API for Capsort - Capstone Collection Platform

## 🚀 Quick Start

### Local Development:

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push

# Start development server
npm run dev
```

Server will run on http://localhost:5000

### Environment Variables:

Copy `.env.example` to `.env` and configure:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_neon_database_url
DIRECT_URL=your_neon_database_url
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3001
CLIENT_URL=http://localhost:3001
```

## 📦 Deployment

This backend is ready for deployment on Render.

### Quick Deployment (5 minutes):
See [RENDER-QUICK-START.md](../RENDER-QUICK-START.md)

### Complete Guide:
See [RENDER-DEPLOYMENT-GUIDE.md](../RENDER-DEPLOYMENT-GUIDE.md)

## 📚 Documentation

- [Render Deployment Guide](../RENDER-DEPLOYMENT-GUIDE.md) - Complete deployment instructions
- [Quick Start](../RENDER-QUICK-START.md) - 5-minute deployment guide
- [Backend Ready](../BACKEND-RENDER-READY.md) - Deployment checklist
- [API Reference](../BACKEND-API-REFERENCE.md) - API endpoints documentation

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Authentication:** JWT + bcrypt
- **Validation:** express-validator
- **Security:** CORS, Rate Limiting, Input Sanitization

## 📊 Features

### Authentication:
- ✅ Student registration
- ✅ Student login
- ✅ Admin login (separate endpoint)
- ✅ Password reset flow with email
- ✅ JWT token authentication
- ✅ Role-based access control

### Projects:
- ✅ CRUD operations (admin only)
- ✅ Public project listing
- ✅ Filtering (field, year, search)
- ✅ Pagination support
- ✅ Soft delete (trash/restore)

### Saved Projects:
- ✅ Save projects (students)
- ✅ Unsave projects
- ✅ List saved projects with filters
- ✅ User-specific saved lists

### Admin Features:
- ✅ Admin profile management
- ✅ System analytics
- ✅ User activity tracking
- ✅ About page content management

## 🔐 Security Features

- ✅ CORS protection with whitelist
- ✅ Rate limiting on all endpoints
- ✅ Input sanitization
- ✅ Security headers (Helmet-like)
- ✅ JWT token authentication
- ✅ Password hashing with bcrypt (12 rounds)
- ✅ SQL injection protection (Prisma)
- ✅ Environment variable protection

## 📝 API Endpoints

### Public Endpoints:

```
GET  /health                      - Health check
GET  /api/projects                - Get all projects (with filters)
GET  /api/projects/:id            - Get project by ID
POST /api/auth/register           - Student registration
POST /api/auth/login              - Student login
POST /api/auth/admin/login        - Admin login
POST /api/auth/forgot-password    - Request password reset
POST /api/auth/reset-password     - Reset password with token
GET  /api/about                   - Get about content
```

### Protected Endpoints (Require Authentication):

```
GET    /api/auth/me                    - Get current user
GET    /api/saved-projects             - Get saved projects
POST   /api/saved-projects             - Save a project
DELETE /api/saved-projects/:projectId  - Unsave a project
```

### Admin Only Endpoints:

```
POST   /api/projects              - Create project
PUT    /api/projects/:id          - Update project
DELETE /api/projects/:id          - Delete project (soft delete)
POST   /api/projects/:id/restore  - Restore deleted project
GET    /api/admin/profile         - Get admin profile
PUT    /api/admin/profile         - Update admin profile
PUT    /api/about                 - Update about content
GET    /api/analytics/*           - Analytics endpoints
```

## 🗄️ Database Schema

### Models:

- **User** - Students and admins
- **Project** - Capstone projects
- **SavedProject** - User's saved projects
- **AboutContent** - About page content

See `prisma/schema.prisma` for complete schema.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Test database connection
npm run test:connection
```

## 🔧 Scripts

```bash
npm start              # Start production server
npm run dev            # Start development server with nodemon
npm run build          # Generate Prisma Client
npm run db:generate    # Generate Prisma Client
npm run db:push        # Push schema to database
npm run db:migrate     # Run migrations
npm run db:seed        # Seed database
npm run create:admin   # Create admin account
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   └── index.js          # Entry point
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── scripts/              # Utility scripts
├── tests/                # Test files
├── package.json          # Dependencies
├── .env.example          # Environment template
├── render.yaml           # Render configuration
└── build.sh              # Build script
```

## 🔗 Related Repositories

- **Frontend:** https://github.com/mmxlvsu/Capsort
- **Monorepo (archived):** https://github.com/jsilmaro/CAPSORT_FRONT_BACK

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT

## 🆘 Support

For issues or questions:
- Check the documentation files
- Review the deployment guides
- Check Render logs for deployment issues

## 🎯 Deployment Status

- ✅ Ready for Render deployment
- ✅ Database schema configured
- ✅ Environment variables documented
- ✅ Build scripts prepared
- ✅ Security measures implemented

Deploy now: Follow [RENDER-QUICK-START.md](../RENDER-QUICK-START.md)
