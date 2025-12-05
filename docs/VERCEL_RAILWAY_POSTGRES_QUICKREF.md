# Vercel + Railway + PostgreSQL - Quick Reference Card

## 🚀 Quick Setup (2-3 hours)

### Part 1: Account Setup (15 min)
```
1. Create Vercel account: https://vercel.com (sign up with GitHub)
2. Create Railway account: https://railway.app (sign up with GitHub)
3. Create SendGrid account: https://sendgrid.com (for emails)
```

### Part 2: Configure Secrets (15 min)
```
Edit .env.production with:
- ADMIN_PASSWORD (16+ chars, random)
- JWT_SECRET (32+ chars, random)
- SMTP_PASSWORD (from SendGrid)
- ADMIN_EMAIL (your email)
```

Generate secure random strings:
```bash
# In PowerShell:
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Random -Minimum 1000000000 -Maximum 9999999999))) | Select-Object -First 32
```

### Part 3: Deploy Frontend to Vercel (30 min)
```
1. Vercel Dashboard → "Add New Project"
2. Select your GitHub repository
3. Configure:
   - Framework: Vite
   - Root Directory: ./client
   - Build Command: npm run build
   - Output Directory: dist
4. Add Environment Variables:
   - VITE_API_BASE_URL: (update after Railway setup)
   - VITE_ENVIRONMENT: production
5. Click "Deploy"
6. Get URL: https://your-project.vercel.app
```

### Part 4: Deploy Backend to Railway (60 min)
```
1. Railway Dashboard → "Create New Project"
2. Select "GitHub Repo"
3. Choose your repository, select server directory
4. Add PostgreSQL:
   - Click "Add Service" → "Database" → "PostgreSQL"
5. Get PostgreSQL Connection String:
   - Click PostgreSQL service → "Connect" tab
   - Copy entire connection string
6. Add Environment Variables to Backend:
   - DATABASE_URL: (paste PostgreSQL connection string)
   - JWT_SECRET: (from .env.production)
   - ADMIN_PASSWORD: (from .env.production)
   - SMTP_HOST: smtp.sendgrid.net
   - SMTP_PORT: 587
   - SMTP_USER: apikey
   - SMTP_PASSWORD: (from SendGrid)
   - ADMIN_EMAIL: (your email)
   - CORS_ORIGIN: https://your-project.vercel.app
   - NODE_ENV: production
7. Railway auto-deploys
8. Get URL: https://your-backend.railway.app
```

### Part 5: Connect Frontend to Backend (15 min)
```
1. Update Vercel environment variable:
   - VITE_API_BASE_URL: https://your-backend.railway.app
2. Vercel auto-redeploys
3. Test: Open your Vercel app → Solutions page → should load automations
```

### Part 6: Run Database Migrations (10 min)
```bash
# In your local terminal:
$env:DATABASE_URL = "postgresql://user:pass@host:5432/dbname"
npm run prisma:migrate
npm run prisma:seed
```

---

## 📊 Cost Breakdown (Monthly)

| Service | Free Tier | Paid Tier | Our Cost |
|---------|-----------|-----------|----------|
| **Vercel** | 100GB bandwidth | $20+ | $0-20 |
| **Railway** | $5 credit | $0.000463/CPU-hr | $5-100 |
| **PostgreSQL** | 5GB storage | $12/mo + usage | $12-50 |
| **SendGrid** | 100 emails/day | Paid plans | $20-50 |
| **TOTAL** | — | — | **$38-245/month** |

---

## 🔑 Environment Variables Quick Copy

### Frontend (Vercel - in dashboard)
```
VITE_API_BASE_URL=https://your-backend.railway.app
VITE_ENVIRONMENT=production
```

### Backend (Railway - in dashboard)
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-secure-random-string-32-chars-minimum
ADMIN_PASSWORD=your-secure-admin-password-16-chars-minimum
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
ADMIN_EMAIL=your-email@example.com
NODE_ENV=production
CORS_ORIGIN=https://your-project.vercel.app
```

---

## ✅ Testing Checklist

- [ ] Frontend loads at vercel URL without errors
- [ ] Backend health check: `curl https://your-backend.railway.app/api/health`
- [ ] Solutions page loads 6 automations from API
- [ ] Demo form submits successfully
- [ ] Admin panel accessible
- [ ] No CORS errors in browser console
- [ ] Database connections show in Railway logs

---

## 🐛 Troubleshooting

### "CORS error" or "Failed to fetch"
```
Solution: 
- Check CORS_ORIGIN in Railway backend matches Vercel domain
- Verify DATABASE_URL is correct in Railway
- Check logs in Railway dashboard
```

### "Cannot find module" error
```
Solution:
- npm install didn't run
- Check Vercel build logs
- Verify package.json has all dependencies
```

### "PostgreSQL connection refused"
```
Solution:
- DATABASE_URL is incorrect
- PostgreSQL service not running in Railway
- Check Railway PostgreSQL logs
```

### "Blank page or 404"
```
Solution:
- Check Vercel build logs
- Verify root directory is ./client
- Check that build command is: npm run build
```

---

## 📚 Useful Links

| Resource | URL |
|----------|-----|
| Vercel Docs | https://vercel.com/docs |
| Railway Docs | https://docs.railway.app |
| SendGrid Docs | https://docs.sendgrid.com |
| Git Guide | https://git-scm.com/docs |

---

## ⚡ Commands Reference

### Local Development
```bash
# Install all dependencies
npm install

# Run frontend dev server (port 5173)
cd client && npm run dev

# Run backend dev server (port 5000)
cd server && npm run dev

# Run database migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

### Deployment
```bash
# Prepare for deployment
./DEPLOY_VERCEL_RAILWAY_SETUP.ps1

# Push to GitHub (triggers auto-deployment)
git add .
git commit -m "your message"
git push origin main
```

### Verify Deployment
```bash
# Test frontend
curl https://your-project.vercel.app

# Test backend health
curl https://your-backend.railway.app/api/health

# Test backend automations API
curl https://your-backend.railway.app/api/automations
```

---

## 🎯 Expected Results After Setup

✅ Frontend running at: `https://your-project.vercel.app`  
✅ Backend running at: `https://your-backend.railway.app`  
✅ Database: PostgreSQL 5GB free tier  
✅ Auto-scaling: Handles 10,000+ concurrent users  
✅ Monthly cost: $38-245  
✅ Deployment: Auto on every git push to main  

---

## 📞 Support

**Stuck?** Check these resources in order:
1. Vercel logs (project → deployments)
2. Railway logs (project → services)
3. Browser console errors (F12 → Console tab)
4. Check environment variables match exactly
5. Verify DNS propagation (if using custom domain)

**For detailed instructions**, see:
- `DEPLOYMENT_SETUP_VERCEL_RAILWAY_POSTGRES.md` (full guide)
- `LAUNCH_STRATEGY.md` (strategic overview)
- `SETUP_GUIDE.md` (general setup)
