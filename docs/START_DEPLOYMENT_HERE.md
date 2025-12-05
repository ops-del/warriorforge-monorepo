# 🚀 DEPLOYMENT PLAYBOOK - Start Here

## What You're About to Do

You're going to deploy a production-grade web application to the internet for **$38-245/month**. 
- ✅ Frontend will auto-scale to handle 10,000+ users
- ✅ Backend will auto-scale with your traffic
- ✅ Database will have automatic backups
- ✅ Updates deploy automatically when you push code

**Total Time**: 2-3 hours  
**Cost**: Free to setup, ~$50-200/month when live

---

## 📋 Pre-Deployment Checklist

Before you start, make sure you have:

- [ ] GitHub account with your code pushed
- [ ] A custom domain (optional, but recommended)
- [ ] Email address for admin and notifications
- [ ] 2-3 hours of uninterrupted time

---

## 🎯 Three Deployment Options

### Option 1: RECOMMENDED - Vercel + Railway
**Best for**: Fastest setup, cheapest for Year 1-2, best developer experience
```
Frontend:   Vercel ($0-20/month)
Backend:    Railway ($5-100/month)
Database:   PostgreSQL on Railway ($12-50/month)
Total:      $38-245/month
Time:       2-3 hours
Scale:      10,000+ concurrent users
```
👉 **Use this guide** if you want to move fast

### Option 2: AWS
**Best for**: Enterprise scale, highest customization
```
Cost: $2,300-5,450/month
Scale: 100,000+ concurrent users
Time: 4-6 hours
```

### Option 3: Multi-Region
**Best for**: Global users, mission-critical
```
Cost: $20,000-50,000/month
Scale: 1M+ concurrent users
Time: 1-2 weeks
```

---

## 📖 Which Guide to Follow?

### Choose ONE:

**Quick Start (30 min summary)**
→ Read: `VERCEL_RAILWAY_POSTGRES_QUICKREF.md`

**Step-by-Step (detailed walkthrough)**
→ Read: `DEPLOYMENT_SETUP_VERCEL_RAILWAY_POSTGRES.md`

**Automated Setup**
→ Run: `./DEPLOY_VERCEL_RAILWAY_SETUP.ps1`

---

## 🏃 FAST TRACK (2 hours)

If you just want to get live quickly, follow these 6 steps:

### Step 1: Create Accounts (10 min)
```
1. https://vercel.com → Sign up with GitHub
2. https://railway.app → Sign up with GitHub
3. https://sendgrid.com → Create account for emails
```

### Step 2: Prepare Secrets (10 min)
```bash
# Edit .env.production with strong passwords
ADMIN_PASSWORD=very_strong_random_password_16_chars_minimum
JWT_SECRET=very_strong_random_secret_32_chars_minimum
SMTP_PASSWORD=your_sendgrid_api_key
```

### Step 3: Deploy Frontend (30 min)
```
In Vercel Dashboard:
1. "Add New Project"
2. Select your GitHub repo
3. Root: ./client
4. Build: npm run build
5. Add env vars: VITE_API_BASE_URL, VITE_ENVIRONMENT
6. Click Deploy → Wait for ✅
```

### Step 4: Deploy Backend (30 min)
```
In Railway Dashboard:
1. "Create New Project" → GitHub Repo
2. Select server directory
3. Add PostgreSQL database ("Add Service")
4. Copy DATABASE_URL from PostgreSQL
5. Add all env variables from .env.production
6. Railway auto-deploys
```

### Step 5: Connect Them (15 min)
```
1. Copy Railway backend URL
2. Go to Vercel → Settings → Environment
3. Update VITE_API_BASE_URL = https://your-backend.railway.app
4. Vercel auto-redeploys
```

### Step 6: Test (15 min)
```
1. Open https://your-project.vercel.app
2. Go to Solutions page
3. Should see 6 automations load
4. Try demo form
5. Check admin at /admin
```

**Result**: You're live! 🎉

---

## 🔍 Verify Everything Works

### Test Frontend
```bash
# Should load without errors
curl https://your-project.vercel.app

# Should show React app
curl https://your-project.vercel.app/api/health
```

### Test Backend
```bash
# Should return {"status":"ok"}
curl https://your-backend.railway.app/api/health

# Should return 6 automations
curl https://your-backend.railway.app/api/automations
```

### Test Database
```bash
# Login to Railway → PostgreSQL → Connect
# Run: SELECT COUNT(*) FROM automations;
# Should return: 6
```

### Test Connection
1. Open browser: `https://your-project.vercel.app`
2. Go to "Solutions" page
3. Should see automations load
4. Open DevTools (F12) → Network tab
5. Should see request to `/api/automations` succeed

---

## 💰 Monthly Costs Explained

### Free Services (First Year)
```
Vercel:       $0 (100GB bandwidth included)
Railway:      $5 credit (included, no payment needed)
PostgreSQL:   $0 (5GB included)
```

### Paid Services (If Needed)
```
SendGrid:     $20-50/month (emails)
Domain:       $10/year (optional)
```

### When Costs Scale Up
```
Vercel:       → $20/month (after 100GB bandwidth)
Railway:      → $0.000463/CPU-hour (after credits)
PostgreSQL:   → $12/month + $0.21/GB (after 5GB)
```

### Year 1 Projection
```
Months 1-3:   Free (using credits)
Months 4-6:   ~$50/month (starting to scale)
Months 7-12:  ~$100-150/month (more traffic)
Total Year 1: ~$400-600
```

---

## 🔐 Security Setup

### Passwords
```
✓ ADMIN_PASSWORD: 16+ characters, random, mixed case
✓ JWT_SECRET: 32+ characters, random, alphanumeric
✓ SMTP_PASSWORD: From SendGrid (API key)
```

### Environment Variables
```
✓ Never commit .env.production to Git
✓ Store in Vercel/Railway dashboards only
✓ Use different values for dev vs production
✓ Rotate secrets every 90 days
```

### CORS Configuration
```
✓ Only allow your Vercel domain
✓ Not "*" (allow all)
✓ Include credentials in requests
```

---

## 📊 Monitoring After Deployment

### Check These Daily (First Week)
```
Vercel Dashboard:
- ✓ Deployments page shows green check
- ✓ No errors in logs
- ✓ Response times < 500ms

Railway Dashboard:
- ✓ Backend service is running (green)
- ✓ No errors in logs
- ✓ CPU/Memory normal levels

Browser:
- ✓ Pages load correctly
- ✓ No CORS errors in Console (F12)
- ✓ Forms submit without errors
```

### Key Metrics to Track
```
Frontend (Vercel):
- Load time: < 3 seconds
- Uptime: > 99.9%
- Errors: 0

Backend (Railway):
- Response time: < 200ms
- Error rate: < 0.1%
- Database connections: < 10

Database:
- Storage: < 5GB (free tier limit)
- Connections: Stable
- Backups: Running automatically
```

---

## 🆘 If Something Goes Wrong

### "CORS error" or "Failed to fetch"
```
Step 1: Check Vercel logs
  - Vercel Dashboard → Deployments → Latest → Logs
  
Step 2: Check Railway logs
  - Railway Dashboard → Backend → Logs
  - Look for "Connection" or "Error" messages
  
Step 3: Verify environment variables
  - CORS_ORIGIN must match exactly
  - API_BASE_URL must be accessible
  
Step 4: Test API directly
  - curl https://your-backend.railway.app/api/health
  - If fails, backend isn't deployed properly
```

### "Blank page" or "Cannot GET /"
```
Step 1: Check Vercel build logs
  - Should show "✓ Ready" or similar
  
Step 2: Verify configuration
  - Root Directory should be: ./client
  - Build Command should be: npm run build
  - Output Directory should be: dist
  
Step 3: Check for deployment errors
  - "Cannot find module" → npm install failed
  - "Type error" → TypeScript compilation failed
```

### "Database connection refused"
```
Step 1: Verify DATABASE_URL format
  - Should be: postgresql://user:pass@host:5432/db
  
Step 2: Check Railway PostgreSQL service
  - Should show green "Running" status
  - Check Logs for connection errors
  
Step 3: Test connection locally
  - $env:DATABASE_URL="your-connection-string"
  - npm run prisma:db push
  
Step 4: Check Railway networking
  - Might need to add outbound IP whitelist
```

### "Build failed" or "Deploy failed"
```
Step 1: Read the error message carefully
  
Step 2: Check Vercel/Railway logs for specifics
  
Step 3: Common causes:
  - Missing dependencies → npm install not run
  - TypeScript errors → Check .ts files
  - Environment variables → Check they're set
  - Build command timeout → Might need upgrade
```

---

## 📈 Next Steps After Going Live

### Week 1: Monitoring
- [ ] Monitor logs daily
- [ ] Check for errors
- [ ] Verify all features work
- [ ] Get feedback from beta testers

### Week 2-4: Optimization
- [ ] Add monitoring tools (Sentry)
- [ ] Set up alerting
- [ ] Optimize slow pages
- [ ] Configure backups

### Month 2: Growth
- [ ] Begin customer acquisition
- [ ] Monitor KPIs (MRR, CAC, etc.)
- [ ] Ship new features weekly
- [ ] Collect customer feedback

### Quarter 2: Scale
- [ ] Add team members
- [ ] Expand marketing
- [ ] Plan Series A (if raising)
- [ ] Optimize operations

---

## 📚 Documentation Files (In Order)

1. **START HERE**: `VERCEL_RAILWAY_POSTGRES_QUICKREF.md` (this will take 30 min to read)
2. **DETAILED**: `DEPLOYMENT_SETUP_VERCEL_RAILWAY_POSTGRES.md` (full guide with all details)
3. **SCRIPT**: `DEPLOY_VERCEL_RAILWAY_SETUP.ps1` (automated setup script)
4. **STRATEGY**: `LAUNCH_STRATEGY.md` (5-year plan after you're live)

---

## ✅ Deployment Success Checklist

- [ ] All accounts created (Vercel, Railway, SendGrid)
- [ ] Environment variables configured
- [ ] Frontend deployed to Vercel (with ✅ status)
- [ ] Backend deployed to Railway (with ✅ status)
- [ ] PostgreSQL database created in Railway
- [ ] Database migrations run
- [ ] Frontend can reach backend (no CORS errors)
- [ ] Solutions page loads 6 automations
- [ ] Demo form submits successfully
- [ ] Admin panel accessible
- [ ] Monitoring configured

---

## 🎉 You're Now Live!

Your production app is running, auto-scaling, and ready for customers.

**Next**: Begin customer acquisition phase (see `LAUNCH_STRATEGY.md` Part 3)

---

**Questions?** See these files for detailed help:
- `DEPLOYMENT_SETUP_VERCEL_RAILWAY_POSTGRES.md` - Full step-by-step guide
- `VERCEL_RAILWAY_POSTGRES_QUICKREF.md` - Quick reference + troubleshooting

**Ready to deploy?** Go to: `VERCEL_RAILWAY_POSTGRES_QUICKREF.md` ⚡
