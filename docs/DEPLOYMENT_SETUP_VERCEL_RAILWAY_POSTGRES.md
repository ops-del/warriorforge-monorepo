# Vercel + Railway + PostgreSQL Deployment Guide

**Estimated Time**: 2-3 hours  
**Cost**: $38-245/month total  
**Result**: Production app running globally with auto-scaling

---

## Part 1: Frontend Deployment (Vercel)

### Prerequisites
- GitHub account with your code pushed
- Vercel account (free tier available)

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "GitHub" as auth method
4. Authorize Vercel to access your GitHub account
5. Click "Create Team" or "Skip" to continue as personal

### Step 2: Import Project to Vercel
1. In Vercel dashboard, click "Add New" → "Project"
2. Find your `warriorforge-ai-agency` repository
3. Click "Import"

### Step 3: Configure Build Settings
```
Framework Preset: Next.js / Vite  (Select "Other" if needed)
Root Directory: ./client
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 4: Set Environment Variables
Click "Environment Variables" and add:

```
VITE_API_BASE_URL=https://your-railway-backend.railway.app
VITE_ENVIRONMENT=production
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-5 minutes for build to complete
3. You'll get a URL like `https://your-project.vercel.app`

### Step 6: Set Custom Domain (Optional)
1. Go to project settings → "Domains"
2. Add `warriorforgeai.com` (or your domain)
3. Update your domain's nameservers to Vercel's:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
4. Wait 24-48 hours for DNS propagation

### Vercel Costs
- **Free Tier**: 100GB bandwidth/month (perfect for Year 1)
- **Pro**: $20/month after free tier limits reached
- **Start with**: Free tier, upgrade only if needed

---

## Part 2: Backend Deployment (Railway)

### Prerequisites
- GitHub account
- Railway account (free tier available)
- PostgreSQL database URL (we'll create in Part 3)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click "Start New Project"
3. Sign in with GitHub
4. Authorize Railway

### Step 2: Create a New Project
1. Click "Create New Project"
2. Select "GitHub Repo"
3. Find and select `warriorforce-ai-agency`
4. Select the `server` directory
5. Click "Deploy"

### Step 3: Add Environment Variables
Railway will detect `server/.env` template. Add these variables:

```
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname
# (You'll get this from Railway PostgreSQL in Part 3)

# JWT & Security
JWT_SECRET=your-secure-random-string-here
ADMIN_PASSWORD=your-secure-admin-password

# Email (Nodemailer)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
ADMIN_EMAIL=your-email@example.com

# API Configuration
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-project.vercel.app
```

### Step 4: Configure Build & Run Commands
In Railway project settings:

```
Build Command: npm install && npm run build
Start Command: npm start
```

### Step 5: Deploy
1. Railway will auto-deploy
2. Watch logs for any errors
3. Once deployed, you'll get a URL like `https://your-backend.railway.app`
4. Copy this URL - you'll need it for frontend config

### Railway Costs
- **Free Tier**: $5/month credit (includes first month free)
- **Pay as you go**: $0.000463 per CPU-hour + $0.0000463 per GB-hour
- **Typical usage**: $5-100/month depending on traffic
- **Start with**: Free tier, scales as you grow

---

## Part 3: PostgreSQL Database (Railway)

### Step 1: Create PostgreSQL in Railway
1. In your Railway project, click "Add Service"
2. Select "Database" → "PostgreSQL"
3. Railway will create and configure automatically

### Step 2: Get Database Connection String
1. In Railway project, click on "PostgreSQL" service
2. Go to "Connect" tab
3. Copy the connection string that looks like:
   ```
   postgresql://user:password@host:5432/railwaydbname
   ```

### Step 3: Set as Environment Variable
1. In Railway project settings, add environment variable:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/railwaydbname
   ```

### Step 4: Run Database Migrations
In your local terminal:

```bash
# Set the database URL
$env:DATABASE_URL="postgresql://user:password@host:5432/railwaydbname"

# Run migrations
npm run prisma:migrate

# Seed with data
npm run prisma:seed
```

### Step 5: Verify Connection
1. In Railway PostgreSQL logs, you should see connection messages
2. Go to your backend logs - should see "Database connected ✓"

### PostgreSQL Costs
- **Free Tier**: 5GB storage (perfect for Year 1-2)
- **Paid**: $12/month + usage ($0.21 per GB over 5GB)
- **Start with**: Free tier, upgrade if needed

---

## Part 4: Connect Frontend to Backend

### Update Frontend Config
Edit `client/src/config.ts`:

```typescript
export const API_BASE_URL = process.env.VITE_API_BASE_URL 
  || 'https://your-backend.railway.app';

export const API_ENDPOINTS = {
  automations: `${API_BASE_URL}/api/automations`,
  demoLeads: `${API_BASE_URL}/api/demo-leads`,
  orders: `${API_BASE_URL}/api/orders`,
  admin: `${API_BASE_URL}/api/admin`,
  health: `${API_BASE_URL}/api/health`,
};
```

### Deploy Updated Frontend
1. Push changes to GitHub:
   ```bash
   git add client/src/config.ts
   git commit -m "feat: configure production API endpoint"
   git push origin main
   ```

2. Vercel will auto-deploy on push
3. Wait for build to complete

### Test Connection
1. Open your Vercel app: `https://your-project.vercel.app`
2. Go to "Solutions" page
3. Should see 6 automations loaded from API
4. If errors, check browser console for CORS issues

---

## Part 5: Enable CORS & Security

### Backend CORS Setup
Edit `server/src/middleware/cors.ts`:

```typescript
export const corsMiddleware = cors({
  origin: [
    'https://your-project.vercel.app',  // Vercel production
    'http://localhost:5173',              // Local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

### Deploy Backend Update
```bash
git add server/src/middleware/cors.ts
git commit -m "fix: configure CORS for production domains"
git push origin main
```

Railway will auto-redeploy.

---

## Part 6: Domain Configuration (Optional)

### If You Have a Custom Domain

**Option A: Point to Vercel (Recommended)**
1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Update nameservers to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
3. In Vercel dashboard, add domain
4. Wait 24-48 hours for DNS propagation

**Option B: Use CNAME Records**
1. In domain registrar, create CNAME:
   - `www` → `cname.vercel-dns.com`
   - `@` → `cname.vercel-dns.com` (apex)
2. Add domain in Vercel settings

### Test Domain
```bash
# After DNS propagates (24-48 hours)
curl https://your-domain.com
```

---

## Part 7: Monitoring & Logs

### Vercel Logs
1. Go to Vercel project dashboard
2. Click "Deployments"
3. Select latest deployment
4. View real-time logs
5. Check for build errors or runtime issues

### Railway Logs
1. Go to Railway project dashboard
2. Click on "Backend" service
3. View live logs
4. Search for errors with `error` keyword
5. Check database connections

### Monitor Performance
**Vercel Analytics**:
- Dashboard shows response times
- Bandwidth usage
- Request counts

**Railway Metrics**:
- CPU usage
- Memory usage
- Database connections

---

## Part 8: Environment Variables Checklist

### Frontend (Vercel)
```
✓ VITE_API_BASE_URL=https://your-backend.railway.app
✓ VITE_ENVIRONMENT=production
```

### Backend (Railway)
```
✓ DATABASE_URL=postgresql://user:pass@host:5432/dbname
✓ JWT_SECRET=long-random-string-here
✓ ADMIN_PASSWORD=your-secure-password
✓ SMTP_HOST=smtp.sendgrid.net
✓ SMTP_PORT=587
✓ SMTP_USER=apikey
✓ SMTP_PASSWORD=your-sendgrid-key
✓ ADMIN_EMAIL=your-email@example.com
✓ NODE_ENV=production
✓ PORT=5000
✓ CORS_ORIGIN=https://your-project.vercel.app
```

---

## Part 9: Testing Checklist

### Before Going Live
- [ ] Frontend loads at `https://your-project.vercel.app`
- [ ] No 404 errors
- [ ] Solutions page loads 6 automations from API
- [ ] Demo form submits successfully
- [ ] Admin panel accessible at `/admin`
- [ ] Email notifications sent on form submission
- [ ] Console shows no CORS errors
- [ ] API health check returns `{"status":"ok"}`

### Command to Test
```bash
# Test API connection
curl https://your-backend.railway.app/api/health

# Test database connection
curl https://your-backend.railway.app/api/automations
```

---

## Part 10: Costs & Scaling

### Monthly Costs (Year 1)
```
Vercel Frontend:    $0-20/month
Railway Backend:    $5-100/month
PostgreSQL DB:      $12-50/month
Email (SendGrid):   $20-50/month
─────────────────
Total:              $38-245/month
```

### Handles This Scale
- 10,000+ concurrent users
- 1M+ requests/month
- 5GB database storage
- Auto-scaling servers

### When to Upgrade
- **Users > 10,000**: Consider Railway paid tier
- **Database > 5GB**: Add PostgreSQL capacity
- **Bandwidth > 100GB**: Vercel will charge overage

---

## Quick Reference: Commands

### Local Development
```bash
# Install dependencies
npm install

# Frontend dev server
cd client && npm run dev

# Backend dev server
cd server && npm run dev

# Database migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed
```

### Deployment
```bash
# Push to trigger deployments
git add .
git commit -m "your message"
git push origin main

# Both Vercel and Railway will auto-deploy
```

### Troubleshooting
```bash
# Check frontend build
vercel build

# Check backend connection
railway logs

# Test API
curl https://your-backend.railway.app/api/health

# Check database
railway db:connect
```

---

## Support & Resources

### Vercel
- Documentation: https://vercel.com/docs
- Support: vercel.com/support
- Status: https://www.vercelstatus.com

### Railway
- Documentation: https://docs.railway.app
- Support: railway.app/support
- Status: https://status.railway.app

### Troubleshooting Common Issues

**CORS Errors**
```
Error: Access to XMLHttpRequest blocked by CORS
Solution: Check CORS_ORIGIN in backend matches Vercel domain
```

**Database Connection Errors**
```
Error: ECONNREFUSED at PostgreSQL port
Solution: Verify DATABASE_URL environment variable is correct
```

**Build Failures**
```
Error: Cannot find module 'react'
Solution: Ensure package.json has all dependencies, run npm install
```

**Blank Page / 404**
```
Solution 1: Check Vercel logs for build errors
Solution 2: Verify correct root directory (./ client)
Solution 3: Check that build command is: npm run build
```

---

## Next Steps After Deployment

1. ✅ Verify everything works on production
2. ✅ Set up monitoring (Sentry, DataDog)
3. ✅ Configure auto-backups for database
4. ✅ Set up alerting for errors
5. ✅ Plan scaling strategy for Year 1
6. ✅ Begin customer acquisition (Day 30)

---

**Status**: Follow this guide step-by-step for successful deployment  
**Estimated Completion**: 2-3 hours for complete setup  
**Result**: Production app running at scale for $38-245/month
