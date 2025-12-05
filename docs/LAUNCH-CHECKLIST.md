# WarriorForge Launch Checklist

## ✅ Completed Features

### Conversion Optimization
- [x] Enhanced hero section with compelling headline and trust signals
- [x] Added testimonials/social proof section (3 client quotes)
- [x] Created Privacy Policy page (GDPR/CCPA compliant)
- [x] Created Terms of Service page
- [x] Enhanced footer with legal links and trust badges
- [x] Implemented cookie consent banner
- [x] Mobile-responsive navbar with hamburger menu
- [x] Professional contact page with working form
- [x] Calendly booking integration with dedicated /book page
- [x] Hero image placeholder (add your own to /public/hero-forge.jpg)

### Backend Features
- [x] JWT authentication system
- [x] Bcrypt password hashing
- [x] Email notifications for demo leads (admin)
- [x] Auto-responder emails for customers
- [x] Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- [x] Environment validation and security hardening

### Frontend Features
- [x] React 19 + Vite + TypeScript
- [x] TailwindCSS styling
- [x] React Router navigation
- [x] Centralized API configuration
- [x] Admin dashboard
- [x] Live demos for 3 automation types

## 🚀 Pre-Launch Tasks

### 1. Content & Assets
- [ ] Add hero image to `client/public/hero-forge.jpg` (recommended: 800x800px, forge/AI theme)
- [ ] Review and customize testimonial quotes if needed
- [ ] Update Calendly URL in `.env` files (both server and client)
- [ ] Add your actual domain to Privacy Policy and Terms pages

### 2. Email Setup (Critical)
- [ ] Configure Gmail SMTP or SendGrid credentials in `server/.env`:
  ```
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=your-email@gmail.com
  SMTP_PASS=your-app-password
  SMTP_SECURE=false
  ```
- [ ] Test email delivery by submitting a demo form
- [ ] Verify auto-responder arrives in customer inbox
- [ ] Check spam folders and adjust SPF/DKIM if needed

### 3. Database Migration (Production)
- [ ] Set up PostgreSQL database (Railway, Supabase, or similar)
- [ ] Update `DATABASE_URL` in production environment
- [ ] Run `npx prisma migrate deploy` in production
- [ ] Seed initial automations: `npx prisma db seed`

### 4. Backend Deployment (Railway)
- [ ] Create Railway project
- [ ] Connect GitHub repo
- [ ] Set environment variables:
  - `DATABASE_URL` (PostgreSQL connection string)
  - `NODE_ENV=production`
  - `CORS_ORIGIN=https://yourdomain.com`
  - `ADMIN_EMAIL=admin@warriorforgeai.com`
  - `ADMIN_JWT_SECRET` (generate: `openssl rand -base64 32`)
  - `ADMIN_PASSWORD_HASH` (generate: see server/DEPLOYMENT.md)
  - `SMTP_*` credentials
- [ ] Deploy and verify health endpoint: `https://your-api.railway.app/api/health`

### 5. Frontend Deployment (Vercel)
- [ ] Create Vercel project
- [ ] Connect GitHub repo (client folder as root)
- [ ] Set environment variables:
  - `VITE_API_BASE_URL=https://your-api.railway.app`
  - `VITE_CALENDLY_URL=https://calendly.com/yourteam/book`
- [ ] Deploy and verify landing page loads

### 6. DNS & Domain (Cloudflare)
- [ ] Point `warriorforgeai.com` to Vercel
- [ ] Point `api.warriorforgeai.com` to Railway backend
- [ ] Enable Cloudflare proxy (orange cloud)
- [ ] Force HTTPS redirect
- [ ] Set up email deliverability records:
  - SPF: `v=spf1 include:_spf.google.com ~all`
  - DKIM: Add Gmail/SendGrid DKIM record
  - DMARC: `v=DMARC1; p=quarantine; rua=mailto:ops@warriorforgeai.com`

### 7. Testing (Pre-Launch)
- [ ] Test all automations on desktop (Chrome, Safari, Firefox)
- [ ] Test on mobile (iOS Safari, Android Chrome)
- [ ] Submit demo forms and verify email delivery
- [ ] Test admin login and dashboard
- [ ] Verify all navigation links work
- [ ] Test cookie consent (accept/decline)
- [ ] Book a test Calendly appointment
- [ ] Check page load speeds (aim for <3s)

### 8. Analytics & Monitoring (Optional but Recommended)
- [ ] Add Google Analytics to track conversions
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Monitor uptime (UptimeRobot, Better Uptime)
- [ ] Track form submissions in admin dashboard

## 📊 Success Metrics to Track

- Landing page → Demo conversion rate (target: 5-15%)
- Demo → Calendly booking rate (target: 20-40%)
- Email open rates (auto-responder: 40%+)
- Time to first reply (aim for <24h)
- Mobile vs desktop traffic
- Top traffic sources

## 🔧 Post-Launch Optimization

### Week 1
- Monitor demo submissions daily
- Respond to all inquiries within 24h
- Fix any bugs reported by users
- A/B test hero headline variations

### Week 2-4
- Add customer success stories (real case studies)
- Create blog content for SEO
- Add live chat widget (optional)
- Implement Stripe payment integration
- Set up automated follow-up sequences

### Month 2+
- Add more automation templates based on demand
- Create video demos (Loom or Luma)
- Build email nurture campaigns
- Launch referral program
- Expand to new niches

## 🆘 Troubleshooting

### Emails not sending
1. Check SMTP credentials in Railway environment
2. Verify Gmail "App Password" (not regular password)
3. Check server logs: `railway logs` or Railway dashboard
4. Test with: `curl -X POST https://your-api/api/demo-leads -H "Content-Type: application/json" -d '{...}'`

### Frontend not connecting to backend
1. Verify `VITE_API_BASE_URL` is set in Vercel
2. Check CORS_ORIGIN matches your frontend URL
3. Open browser console for error messages
4. Test API health: `curl https://your-api/api/health`

### Admin login fails
1. Ensure `ADMIN_JWT_SECRET` is set in production
2. Verify `ADMIN_PASSWORD_HASH` matches your password
3. Clear localStorage and try again
4. Check Network tab for 401 errors

## 📞 Support Contacts

- **Email**: ops@warriorforgeai.com
- **Calendly**: Book at `/book` page
- **Admin Dashboard**: `/admin/login`

---

## Quick Commands Reference

### Local Development
```bash
# Backend
cd server
npm install
npm run dev  # Runs on :5000

# Frontend
cd client
npm install
npm run dev  # Runs on :5173
```

### Production Build
```bash
# Backend
cd server
npm ci
npx prisma migrate deploy
npx prisma generate
npm run build
npm run start

# Frontend
cd client
npm ci
npm run build
# Outputs to client/dist/
```

### Generate Admin Password Hash
```bash
cd server
npx ts-node -e "import('bcryptjs').then(bcrypt => bcrypt.hash('YourPasswordHere', 10).then(console.log))"
```

---

**You're ready to launch! 🚀 All core features are implemented and tested locally.**
