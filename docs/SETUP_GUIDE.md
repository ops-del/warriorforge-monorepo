# WarriorForge AI Automations - Setup & Testing Guide

## ✅ Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Git

### Setup

```bash
# 1. Navigate to project root
cd ai-automation-agency

# 2. Install server dependencies
cd server && npm install

# 3. Install client dependencies  
cd ../client && npm install

# 4. Go back to root
cd ..

# 5. Start development servers
npm run dev
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

---

## 📋 Environment Configuration

### Server Environment (.env)
Located at `server/.env`

```env
# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173

# Database
DATABASE_URL="file:./dev.db"

# Admin
ADMIN_EMAIL=ops@warriorforgeai.com
ADMIN_PASSWORD=WarriorForgeAdmin123
ADMIN_JWT_SECRET=local-dev-jwt-secret-change-in-production

# Email (SMTP)
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=re_your_api_key_here
SMTP_SECURE=false
```

### Client Environment (.env.local)
Located at `client/.env.local`

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_CALENDLY_URL=https://calendly.com/warriorforge/book
```

---

## 🗄️ Database Setup

### Initialize Database
```bash
cd server
npm run prisma:migrate
npm run prisma:seed
```

This will:
- Create SQLite database (`dev.db`)
- Run all migrations
- Seed with sample automations

### View Database (Optional)
```bash
# Install Prisma Studio
npm install -g prisma-studio

# View database GUI
prisma studio
```

---

## 🧪 Testing

### All Features Should Work

#### 1. **Landing Page** ✅
- Navigate to http://localhost:5173
- Hero section displays with animated gradient
- All hero images load correctly (SVG format)
- CTA buttons work

#### 2. **Solutions/Automations Page** ✅
- Click "Explore Automations" or "Solutions" in navbar
- Should load 6 automation cards from database
- Search functionality works
- "View details" and "Order now" buttons navigate correctly

#### 3. **Demo Pages** ✅
- Click "Try Live Demo — Free" on landing page
- Should show interactive chat demo
- After conversation steps, lead capture form appears
- Submit form to test API

#### 4. **Contact Page** ✅
- Navigate to Contact page
- Fill out contact form
- Submit button sends demo lead to backend
- Should see success message
- Admin receives email notification

#### 5. **Admin Dashboard** ✅
- Navigate to http://localhost:5173/admin
- Enter password: `WarriorForgeAdmin123`
- Dashboard shows demo leads & orders
- Can view lead details

#### 6. **Images**
All images are now in SVG format for best quality:
- `/public/hero-forge.svg` - Hero banner
- `/public/feature-*.svg` - Feature cards
- `/public/avatar-*.svg` - Testimonial avatars

---

## 🚀 Deployment to warriorforgeai.com

### Option 1: Vercel (Frontend)

```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect to Vercel
# - Go to https://vercel.com
# - Import repository
# - Set environment variables in Vercel dashboard
# - Deploy

# Environment variables in Vercel:
VITE_API_BASE_URL=https://api.warriorforgeai.com
VITE_CALENDLY_URL=https://calendly.com/warriorforge/book
```

### Option 2: Railway (Full Stack)

```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Login to Railway
railway login

# 3. Create new project
railway init

# 4. Add database plugin (PostgreSQL)
railway add

# 5. Deploy
railway up
```

### Option 3: Docker + Custom VPS

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Build server
COPY server package*.json ./
RUN npm ci

# Build client
COPY client client/
WORKDIR /app/client
RUN npm ci && npm run build

# Final stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 5000
CMD ["npm", "run", "start:prod"]
```

---

## 📧 Email Configuration

### SMTP Setup (Using Resend)

1. **Get Resend API Key**
   - Go to https://resend.com
   - Sign up / login
   - Get API key from dashboard

2. **Update .env**
   ```env
   SMTP_HOST=smtp.resend.com
   SMTP_PORT=587
   SMTP_USER=resend
   SMTP_PASS=re_your_api_key_here
   ```

3. **Verify Email Domain**
   - Add domain to Resend account
   - Update DNS records as instructed

---

## 🌐 DNS Setup

For warriorforgeai.com to work:

### With Vercel (Frontend Only)
```
CNAME: www → cname.vercel-dns.com
A: @ → 76.76.19.165
```

### With Custom Backend
```
A: api → your-vps-ip
CNAME: www → vercel-cdn.example.com
```

---

## 📦 Build for Production

```bash
# Client build
cd client
npm run build
# Output: client/dist/

# Server build
cd server
npm run build
# Output: server/dist/

# Start production server
node dist/index.js
```

---

## 🔍 Troubleshooting

### Failed to Fetch Error
**Solution**: Check API_BASE_URL in client config matches server port

```bash
# Verify server is running
curl http://localhost:5000/api/health
# Should return: {"status":"ok"}
```

### Database Connection Error
**Solution**: Seed the database

```bash
cd server
npm run prisma:seed
```

### Email Not Sending
**Solution**: Verify SMTP credentials in .env

```bash
# Test connection
npm run dev  # Check server logs for email errors
```

### Images Not Loading
**Solution**: Check public folder

```bash
ls client/public/
# Should show: hero-forge.svg, avatar-*.svg, feature-*.svg
```

---

## 📊 Performance Optimization

### Client-Side
- ✅ SVG images for best quality & smallest size
- ✅ Code splitting via React Router
- ✅ CSS framework (Tailwind) for small bundle
- ✅ HMR in dev, SSG in prod

### Server-Side
- ✅ SQLite for simple deployments
- ✅ CORS enabled for cross-domain requests
- ✅ Error middleware for proper HTTP codes
- ✅ Nodemailer for async email sending

---

## 📝 Key Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/automations` | List all automations |
| GET | `/api/automations/:id` | Get automation details |
| POST | `/api/orders` | Create order |
| POST | `/api/demo-leads` | Submit demo lead |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/demo-leads` | List demo leads (auth required) |

---

## 🎯 Next Steps

1. ✅ Test all features locally
2. 📧 Configure email (SMTP/Resend)
3. 🌍 Set up domain (warriorforgeai.com)
4. 🚀 Deploy to production (Vercel + Railway/Custom)
5. 📊 Monitor performance & logs
6. 🔄 Set up CI/CD pipeline

---

**Status**: ✅ Fully Operational & Ready for Deployment
