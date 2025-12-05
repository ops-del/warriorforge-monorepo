# 🌐 Domain Configuration: warriorforgeai.com

## Step-by-Step Guide to Get Your App Running on warriorforgeai.com

---

## 📋 Prerequisites

You need:
1. Domain name: `warriorforgeai.com` (purchase from GoDaddy, Namecheap, etc.)
2. Hosting for frontend (Vercel - FREE)
3. Hosting for backend (Railway or Custom VPS)
4. Email service (Resend or SendGrid)

---

## 🎯 Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

### Step 1: Deploy Frontend to Vercel

```bash
# 1. Make sure code is pushed to GitHub
git push origin main

# 2. Go to https://vercel.com
# 3. Sign up with GitHub
# 4. Click "Import Project"
# 5. Select your repository
# 6. Configure project:
#    - Framework: Vite
#    - Root Directory: client
#    - Environment variables:
#      VITE_API_BASE_URL=https://api.warriorforgeai.com
#      VITE_CALENDLY_URL=https://calendly.com/warriorforge/book
# 7. Deploy

# You'll get a Vercel domain: xxx.vercel.app
```

### Step 2: Deploy Backend to Railway

```bash
# 1. Go to https://railway.app
# 2. Sign up with GitHub
# 3. Create new project
# 4. Select repository
# 5. Add PostgreSQL database
# 6. Deploy

# Environment Variables in Railway:
PORT=5000
NODE_ENV=production
DATABASE_URL=[Railway auto-generates]
CORS_ORIGIN=https://warriorforgeai.com
ADMIN_EMAIL=ops@warriorforgeai.com
ADMIN_PASSWORD=YourSecurePassword
ADMIN_JWT_SECRET=your-super-secret-key
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=re_your_api_key
SMTP_SECURE=true

# You'll get a Railway domain: xxx-production.up.railway.app
```

### Step 3: Update DNS at Domain Registrar

Go to your domain registrar (GoDaddy, Namecheap, etc.) and update DNS records:

```
# For Vercel Frontend
www CNAME cname.vercel-dns.com
@ A 76.76.19.165

# For Railway Backend API
api CNAME xxx-production.up.railway.app
```

**Wait 15-30 minutes for DNS to propagate**

### Step 4: Update Environment Variables

Once DNS is propagated:

**In Vercel Dashboard:**
```env
VITE_API_BASE_URL=https://api.warriorforgeai.com
```

**In Railway Dashboard:**
```env
CORS_ORIGIN=https://warriorforgeai.com
```

---

## 🎯 Option 2: Custom VPS (Full Control)

### Step 1: Get a VPS

Choose one:
- DigitalOcean (droplet)
- Linode
- Vultr
- AWS EC2
- Google Cloud

Recommended: **DigitalOcean** ($5-10/month)

```bash
# After creating droplet with Ubuntu 20.04 LTS:

# SSH into your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PM2 (process manager)
npm i -g pm2

# Install Nginx (reverse proxy)
apt install -y nginx

# Install Certbot (SSL certificates)
apt install -y certbot python3-certbot-nginx
```

### Step 2: Deploy Application

```bash
# Clone your repository
git clone https://github.com/your-username/ai-automation-agency.git
cd ai-automation-agency

# Install dependencies
npm install --prefix server
npm install --prefix client

# Build
npm run build --prefix client
npm run build --prefix server

# Create .env file
cat > server/.env << EOF
PORT=5000
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@localhost:5432/warriorforge"
CORS_ORIGIN=https://warriorforgeai.com
ADMIN_EMAIL=ops@warriorforgeai.com
ADMIN_PASSWORD=YourSecurePassword
ADMIN_JWT_SECRET=your-super-secret-key
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=re_your_api_key
SMTP_SECURE=true
EOF

# Start with PM2
pm2 start dist/index.js --name "warriorforge-api"
pm2 save
pm2 startup
```

### Step 3: Set Up Nginx Reverse Proxy

```bash
# Create Nginx config
cat > /etc/nginx/sites-available/warriorforgeai.com << EOF
server {
    listen 80;
    server_name api.warriorforgeai.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

server {
    listen 80;
    server_name warriorforgeai.com www.warriorforgeai.com;
    
    # Serve static files from client dist
    root /root/ai-automation-agency/client/dist;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Enable Nginx site
ln -s /etc/nginx/sites-available/warriorforgeai.com /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

### Step 4: Set Up SSL Certificate

```bash
# Get free SSL certificate with Certbot
certbot --nginx -d warriorforgeai.com -d www.warriorforgeai.com -d api.warriorforgeai.com

# Auto-renew
systemctl enable certbot.timer
systemctl start certbot.timer
```

### Step 5: Update DNS at Registrar

```
@ A your-vps-ip
www A your-vps-ip
api A your-vps-ip
```

---

## 🎯 Option 3: Docker + Vercel

### Step 1: Create Docker Image

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY server package*.json ./
RUN npm ci

COPY server/src ./src
COPY server/tsconfig.json ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 5000
CMD ["node", "dist/index.js"]
```

### Step 2: Push to Docker Hub

```bash
docker build -t yourusername/warriorforge-api .
docker push yourusername/warriorforge-api
```

### Step 3: Deploy to Railway

- Select "Docker" option in Railway
- Paste your Docker image
- Add environment variables
- Deploy

---

## ✅ Final DNS Setup

Once you choose your deployment option, your DNS should look like:

```
DOMAIN RECORDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type  | Name  | Value
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A     | @     | 76.76.19.165 (Vercel)
CNAME | www   | cname.vercel-dns.com
CNAME | api   | your-railway-domain.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OR (if custom VPS):
A     | @     | your-vps-ip
A     | www   | your-vps-ip
A     | api   | your-vps-ip
```

---

## 🔗 Test Your Domain

After DNS updates propagate (15-30 min):

```bash
# Test frontend
curl https://warriorforgeai.com
# Should return HTML

# Test backend health
curl https://api.warriorforgeai.com/api/health
# Should return: {"status":"ok"}

# Test API
curl https://api.warriorforgeai.com/api/automations
# Should return: [{"id":1,...}]
```

---

## 🔒 SSL/HTTPS Setup

### For Vercel
- ✅ Automatic - comes with custom domain

### For Railway
- ✅ Automatic - provides SSL

### For Custom VPS
- Use Certbot (shown above)

---

## 📧 Email Configuration

Before going live, upgrade your email service:

### Resend (Recommended)
1. Go to https://resend.com
2. Get API key
3. Add domain for verification
4. Update SMTP credentials in .env

### Alternative: SendGrid
1. Go to https://sendgrid.com
2. Get API key
3. Update SMTP_HOST to smtp.sendgrid.net
4. Update SMTP_USER to apikey
5. Update SMTP_PASS to your API key

---

## 🚀 Going Live Checklist

- [ ] Domain purchased and pointed to your servers
- [ ] Frontend deployed to Vercel (or custom server)
- [ ] Backend deployed to Railway (or custom VPS)
- [ ] Database set up and migrated
- [ ] SSL certificates installed
- [ ] Email service configured
- [ ] Admin password changed
- [ ] JWT secret updated
- [ ] Environment variables set correctly
- [ ] DNS propagated and tested
- [ ] Frontend loads at warriorforgeai.com
- [ ] API works at api.warriorforgeai.com
- [ ] Demo forms submit successfully
- [ ] Emails send correctly

---

## 🆘 Troubleshooting

### Domain not resolving
- Check DNS records are correct
- Wait 30 minutes for propagation
- Try flushing DNS: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### API returning 503 (Service Unavailable)
- Check Railway/VPS is running
- Check environment variables
- Check database connection
- Review server logs

### Emails not sending
- Verify SMTP credentials
- Check email domain is verified
- Check server logs for errors
- Test with telnet: `telnet smtp.resend.com 587`

### Frontend shows blank page
- Check browser console for errors
- Verify VITE_API_BASE_URL is correct
- Check Vercel deployment logs

---

## 📊 Monitoring

### For Vercel
- Analytics tab shows traffic
- Deployment logs available

### For Railway
- Metrics tab shows CPU/Memory
- Logs available in real-time

### For Custom VPS
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs

# Check system resources
top
df -h
```

---

## 🔄 Updates & Deployments

### Deploy new version

```bash
# Make changes locally
git add .
git commit -m "feat: your changes"
git push origin main

# Vercel auto-deploys
# Railway auto-deploys (if configured)

# For custom VPS:
cd /root/ai-automation-agency
git pull origin main
npm run build --prefix server
pm2 restart warriorforge-api
```

---

**Status**: Ready to deploy! Follow the option that works best for your needs.
