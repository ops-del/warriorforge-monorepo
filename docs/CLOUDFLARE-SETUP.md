# Cloudflare DNS & Email Setup Guide

## 🌐 DNS Configuration

### Step 1: Add Your Domain to Cloudflare
1. Go to https://dash.cloudflare.com
2. Click "Add a Site"
3. Enter `warriorforgeai.com`
4. Choose the Free plan
5. Cloudflare will scan your existing DNS records

### Step 2: Update Nameservers at Your Domain Registrar
Cloudflare will provide you with 2 nameservers like:
- `alexa.ns.cloudflare.com`
- `chad.ns.cloudflare.com`

Go to your domain registrar (GoDaddy, Namecheap, etc.) and update nameservers to the ones Cloudflare provides.

**⏱️ Wait 24-48 hours for DNS propagation (usually faster)**

### Step 3: Add DNS Records in Cloudflare

Once nameservers are updated, add these DNS records:

#### Frontend (Vercel)
| Type | Name | Content | Proxy Status |
|------|------|---------|--------------|
| CNAME | @ | cname.vercel-dns.com | ✅ Proxied (Orange Cloud) |
| CNAME | www | cname.vercel-dns.com | ✅ Proxied (Orange Cloud) |

**Note:** You may need to use the actual Vercel deployment URL instead. Check Vercel dashboard > Settings > Domains for the exact CNAME target.

#### Backend (Railway)
| Type | Name | Content | Proxy Status |
|------|------|---------|--------------|
| CNAME | api | your-app.up.railway.app | ✅ Proxied (Orange Cloud) |

Replace `your-app.up.railway.app` with your actual Railway domain.

#### Email Records (For ops@warriorforgeai.com)

**Option A: Using Gmail/Google Workspace**

| Type | Name | Content | TTL | Priority |
|------|------|---------|-----|----------|
| MX | @ | ASPMX.L.GOOGLE.COM | Auto | 1 |
| MX | @ | ALT1.ASPMX.L.GOOGLE.COM | Auto | 5 |
| MX | @ | ALT2.ASPMX.L.GOOGLE.COM | Auto | 5 |
| MX | @ | ALT3.ASPMX.L.GOOGLE.COM | Auto | 10 |
| MX | @ | ALT4.ASPMX.L.GOOGLE.COM | Auto | 10 |
| TXT | @ | v=spf1 include:_spf.google.com ~all | Auto | - |
| TXT | _dmarc | v=DMARC1; p=quarantine; rua=mailto:ops@warriorforgeai.com | Auto | - |

**Option B: Using Resend (Recommended for Transactional Emails)**

1. Sign up at https://resend.com
2. Add domain `warriorforgeai.com`
3. Resend will provide specific DNS records - add them to Cloudflare
4. Verify domain in Resend dashboard
5. Get API key and update in Railway:
   - `SMTP_HOST=smtp.resend.com`
   - `SMTP_PORT=587`
   - `SMTP_USER=resend`
   - `SMTP_PASS=re_your_api_key_here`
   - `SMTP_SECURE=false`

### Step 4: SSL/TLS Settings

1. Go to Cloudflare > SSL/TLS
2. Set SSL/TLS encryption mode to **Full (Strict)**
3. Enable "Always Use HTTPS" under Edge Certificates
4. Enable "Automatic HTTPS Rewrites"

### Step 5: Performance Optimization

**Caching:**
- Go to Caching > Configuration
- Set Browser Cache TTL to "Respect Existing Headers"

**Speed:**
- Enable Auto Minify (JavaScript, CSS, HTML)
- Enable Brotli compression
- Enable HTTP/2 to HTTP/3

**Security:**
- Go to Security > Settings
- Set Security Level to "Medium"
- Enable Bot Fight Mode (Free plan)

## 📧 Email Deliverability Setup

### Using Resend (Recommended)

1. **Sign up:** https://resend.com/signup
2. **Add Domain:**
   - Click "Domains" → "Add Domain"
   - Enter `warriorforgeai.com`
   - Copy the DNS records Resend provides

3. **Add DNS Records to Cloudflare:**
   ```
   TXT   @   resend._domainkey   [value from Resend]
   MX    @   feedback-smtp.resend.com   10
   ```

4. **Verify Domain** in Resend dashboard (takes 5-30 minutes)

5. **Get API Key:**
   - Go to API Keys → Create API Key
   - Copy the key (starts with `re_`)
   - Add to Railway environment:
     ```
     SMTP_HOST=smtp.resend.com
     SMTP_PORT=587
     SMTP_USER=resend
     SMTP_PASS=re_your_api_key_here
     SMTP_SECURE=false
     ```

6. **Set From Email** in code:
   Update `server/src/services/email.service.ts`:
   ```typescript
   from: "WarriorForge <ops@warriorforgeai.com>"
   ```

### Using Gmail (Alternative)

1. **Enable 2FA** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account → Security → 2-Step Verification
   - Scroll down to "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Enter "WarriorForge SMTP"
   - Copy the 16-character password

3. **Update Railway Environment:**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   SMTP_SECURE=false
   ```

4. **Add DNS Records to Cloudflare:**
   ```
   MX    @    ASPMX.L.GOOGLE.COM    1
   MX    @    ALT1.ASPMX.L.GOOGLE.COM    5
   MX    @    ALT2.ASPMX.L.GOOGLE.COM    5
   TXT   @    v=spf1 include:_spf.google.com ~all
   TXT   _dmarc   v=DMARC1; p=quarantine; rua=mailto:ops@warriorforgeai.com
   ```

## 🔍 Verification Steps

### Test DNS Resolution
```powershell
# Test frontend domain
nslookup warriorforgeai.com

# Test API subdomain
nslookup api.warriorforgeai.com

# Test MX records
nslookup -type=MX warriorforgeai.com
```

### Test Email Deliverability
1. Submit a demo form on your live site
2. Check that admin receives notification
3. Check customer receives auto-responder
4. Use https://www.mail-tester.com to verify deliverability score (aim for 9/10+)

### Test SSL Certificate
```powershell
curl -I https://warriorforgeai.com
# Should return "200 OK" with HTTPS
```

## 🎯 Production URLs After Setup

- **Frontend:** https://warriorforgeai.com
- **Backend API:** https://api.warriorforgeai.com
- **Admin Dashboard:** https://warriorforgeai.com/admin
- **Live Demo:** https://warriorforgeai.com/demo/lead-capture
- **Booking:** https://warriorforgeai.com/book

## ⚠️ Common Issues

### DNS Not Resolving
- **Solution:** Wait 24-48 hours for propagation, or flush DNS cache:
  ```powershell
  ipconfig /flushdns
  ```

### CORS Errors
- **Solution:** Ensure Railway `CORS_ORIGIN` matches your Vercel domain exactly:
  ```
  CORS_ORIGIN=https://warriorforgeai.com
  ```

### Emails Going to Spam
- **Solution:** 
  1. Add SPF, DKIM, and DMARC records
  2. Use Resend instead of Gmail for better deliverability
  3. Warm up your domain by sending gradually increasing volumes

### SSL Certificate Issues
- **Solution:** Set Cloudflare SSL mode to "Full (Strict)" and wait 5-10 minutes

## 📞 Support

If you encounter issues:
1. Check Cloudflare Analytics for errors
2. Review Railway logs: `railway logs`
3. Check Vercel deployment logs in dashboard
4. Test API health: `curl https://api.warriorforgeai.com/api/health`

---

**✅ Once all DNS records are added and verified, your site will be live!**
