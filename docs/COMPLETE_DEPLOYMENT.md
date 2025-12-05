# 🚀 WarriorForge Complete Deployment Guide

## Quick Start - Deploy in 30 Minutes

This guide walks you through deploying WarriorForge to Railway (backend), Vercel (frontend), and Cloudflare (DNS) - **all with FREE tiers**.

---

## Phase 1: Prepare Your Credentials (5 minutes)

### What You'll Need:
- GitHub account (already have)
- Gmail account (for SMTP)
- Cloudflare account (free)
- Domain name (warriorforgeai.com)

### Generate Admin Password Hash

Before deployment, generate a bcrypt hash for your admin password:

**Option A: Using PowerShell**
```powershell
npm install -g bcryptjs-cli
bcryptjs hash "YourStrongPassword123" 10
# Output: $2b$10$... (copy this entire string)
```

**Option B: Online (less secure, use only for dev)**
- Go to https://bcrypt-generator.com
- Enter your password
- Cost: 10
- Copy the hash

---

## Phase 2: Deploy Backend to Railway (8 minutes)

### Step 1: Create Railway Project
1. Go to https://railway.app/dashboard
2. Sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose: `ops-del/warriorforge-ai-agency`
6. When prompted, select root directory: **`server`**

### Step 2: Add PostgreSQL Database
1. In Railway dashboard, click **"Add"**
2. Select **"PostgreSQL"**
3. Database will start automatically
4. Copy the `DATABASE_URL` from the Postgres plugin

### Step 3: Set Environment Variables
In Railway dashboard, go to **Variables** tab and add:

```
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://warriorforgeai.com
ADMIN_EMAIL=admin@warriorforgeai.com
ADMIN_JWT_SECRET=[generate-random-32-chars-or-use-openssl]
ADMIN_PASSWORD_HASH=[your-bcrypt-hash]
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ops@warriorforgeai.com
SMTP_PASS=[Gmail-app-password]
SMTP_SECURE=false
DATABASE_URL=[copied-from-postgres-plugin]
```

### Step 3.5: Generate JWT Secret
In PowerShell:
```powershell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString() + (New-Guid).ToString()))
```

### Step 4: Deploy
1. Railway will automatically build (3-5 minutes)
2. Check build logs for errors
3. Once deployed, you'll see a **Railway URL** like: `https://railway-app-name.up.railway.app`
4. Copy this URL for Step 4

### Step 5: Verify Backend
```powershell
# Replace with your Railway URL
curl https://[your-railway-url]/api/health
# Should return: {"status":"ok"}
```

---

## Phase 3: Deploy Frontend to Vercel (8 minutes)

### Step 1: Create Vercel Project
1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Select repository: `ops-del/warriorforge-ai-agency`
4. Import settings:
   - **Framework Preset**: Other
   - **Root Directory**: `client/`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 2: Add Environment Variables
Before deploying, add to Vercel:

```
VITE_API_BASE_URL=https://[your-railway-url]
VITE_CALENDLY_URL=https://calendly.com/warriorforge/book
```

### Step 3: Deploy
1. Click **"Deploy"**
2. Vercel will build automatically (2-3 minutes)
3. Once complete, you'll get a Vercel URL
4. Test: Click the URL and verify the landing page loads

### Step 4: Add Custom Domain (Vercel)
1. Go to Vercel Project Settings
2. Click **"Domains"**
3. Enter: `warriorforgeai.com`
4. Keep it for now (we'll configure in Cloudflare)

---

## Phase 4: Configure Cloudflare DNS (8 minutes)

### Step 1: Add Domain to Cloudflare
1. Go to https://dash.cloudflare.com
2. Sign up for free account
3. Click **"Add a domain"**
4. Enter: `warriorforgeai.com`
5. Select **Free Plan**
6. Cloudflare will give you 2 nameservers

### Step 2: Update Nameservers at Domain Registrar
1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS settings
3. Replace existing nameservers with Cloudflare's
4. Save changes
5. **Wait 24-48 hours for propagation**

### Step 3: Add DNS Records in Cloudflare
In Cloudflare dashboard, go to **DNS** tab and add:

**Record 1: Frontend (Vercel)**
```
Type: CNAME
Name: @
Content: cname.vercel-dns.com
TTL: Auto
Proxy: Proxied (orange cloud)
```

**Record 2: API (Railway)**
```
Type: CNAME
Name: api
Content: [your-railway-app-name].up.railway.app
TTL: Auto
Proxy: DNS Only (gray cloud)
```

**Record 3: Email SPF**
```
Type: TXT
Name: @
Content: v=spf1 include:_spf.google.com ~all
TTL: Auto
```

**Record 4: DMARC**
```
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=quarantine; rua=mailto:ops@warriorforgeai.com
TTL: Auto
```

### Step 4: Enable SSL
1. Go to **SSL/TLS** tab
2. Set **Encryption mode**: Full (strict)
3. Enable **Always Use HTTPS**: ON
4. Enable **Auto HTTPS Rewrites**: ON

### Step 5: Verify DNS
```powershell
# Check DNS propagation
nslookup warriorforgeai.com
nslookup api.warriorforgeai.com

# Verify endpoints
curl https://warriorforgeai.com
curl https://api.warriorforgeai.com/api/health
```

---

## Phase 5: Test Everything (5 minutes)

### Frontend Tests
- [ ] Navigate to https://warriorforgeai.com
- [ ] Hero section loads with image
- [ ] Click "Try Live Demo" → Demo page loads
- [ ] Click "Book a Call" → Calendly loads
- [ ] Cookie banner appears at bottom
- [ ] Mobile menu works (resize to mobile)

### Backend Tests
- [ ] Submit demo form on /demo/lead-capture
- [ ] Check email inbox for auto-responder
- [ ] Go to /admin/login
- [ ] Login with: `admin@warriorforgeai.com` / `YourStrongPassword123`
- [ ] View demo leads in dashboard

### Email Tests
- [ ] Check Gmail for SMTP errors (if any)
- [ ] Verify auto-responder arrives within 1 minute
- [ ] Check spam folder if missing

---

## Troubleshooting

### Backend won't deploy
```
Check Railway logs:
1. Go to Railway dashboard
2. Click project
3. View Deployments > Build Logs
4. Common issues:
   - Missing DATABASE_URL
   - Missing ADMIN_JWT_SECRET
   - Type errors in TypeScript
```

### Frontend won't load API
```
Check Vercel environment:
1. Go to Vercel Project Settings > Environment Variables
2. Verify VITE_API_BASE_URL is set correctly
3. Redeploy: git push (automatic) or use Vercel UI
```

### DNS not resolving
```
Wait 24-48 hours:
1. Check propagation: https://www.whatsmydns.net
2. Verify records: nslookup warriorforgeai.com
3. Check Cloudflare active zones
```

### Emails not sending
```
Gmail SMTP issues:
1. Enable 2FA on Gmail
2. Create App Password: https://myaccount.google.com/apppasswords
3. Use the 16-char password in SMTP_PASS
4. Check spam folder for test emails
```

---

## Post-Deployment Checklist

- [ ] Backend health check passes
- [ ] Frontend loads without errors
- [ ] DNS records resolve
- [ ] SSL certificate valid
- [ ] Demo form sends emails
- [ ] Admin dashboard works
- [ ] Mobile responsive
- [ ] Cookie banner functional
- [ ] Contact form working
- [ ] Book a call redirects to Calendly

---

## Cost Breakdown (Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| Railway Backend | $0 (uses $5 free credit) | PostgreSQL + Node.js |
| Vercel Frontend | $0 | Free tier unlimited |
| Cloudflare DNS | $0 | Free tier all features |
| Domain | ~$10-15 | (separate registrar) |
| Gmail SMTP | $0 | Included with account |
| **Total** | **$0 - $15** | Completely free tier! |

---

## Next Steps

1. **Monitor**: Set up uptime monitoring (UptimeRobot free tier)
2. **Analytics**: Add Google Analytics
3. **Error Tracking**: Add Sentry (free tier)
4. **Iterate**: Collect feedback, improve conversion

---

## Support

- **Docs**: See LAUNCH-CHECKLIST.md
- **Issues**: Check Railway/Vercel logs
- **Contact**: ops@warriorforgeai.com

**You're live! 🎉**
