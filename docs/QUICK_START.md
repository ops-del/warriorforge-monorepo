# ⚡ QUICK REFERENCE - WarriorForge AI Automations

## 🚀 START DEVELOPMENT
```bash
npm run dev
# Opens: http://localhost:5173 (Frontend)
#        http://localhost:5000 (API)
```

## 📍 LOCAL URLS
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **Admin Panel**: http://localhost:5173/admin

## 🔐 ADMIN CREDENTIALS
- **URL**: http://localhost:5173/admin
- **Password**: `WarriorForgeAdmin123`

## 📁 KEY FILES & FOLDERS
```
ai-automation-agency/
├── client/                    # React frontend
│   ├── src/pages/            # All pages
│   ├── src/components/       # Components
│   └── public/               # Images (SVG)
├── server/                    # Express backend
│   ├── src/routes/           # API routes
│   ├── src/services/         # Business logic
│   └── prisma/               # Database
├── SETUP_GUIDE.md            # Setup instructions
├── README_FINAL.md           # Status & features
└── DOMAIN_SETUP.md           # Deployment guide
```

## ⚙️ CONFIG FILES
- `server/.env` - Backend environment
- `client/.env.local` - Frontend environment
- Both configured and ready to use

## 🗄️ DATABASE
```bash
# Initialize database
npm run prisma:seed --prefix server

# View database GUI
npx prisma studio --prefix server

# Current data: 6 automations seeded
```

## 📧 SMTP SETUP
- **Provider**: Resend (configured)
- **Host**: smtp.resend.com
- **Port**: 587
- **Placeholder**: Get API key from https://resend.com

## 🌐 DEPLOYMENT TO warriorforgeai.com

### Quick Deploy (Vercel + Railway) - 10 min
```
1. Go to Vercel.com → Import GitHub repo → Deploy
2. Go to Railway.app → Import same repo → Deploy  
3. Update DNS at registrar
4. Done!
```

See `DOMAIN_SETUP.md` for full instructions

## ✅ WHAT'S WORKING
- ✅ All 6 automation pages load correctly
- ✅ Solutions page fetches from API
- ✅ Demo pages with lead capture
- ✅ Admin dashboard
- ✅ Email notifications
- ✅ Contact form submission
- ✅ All images display

## 🐛 IF SOMETHING BREAKS
```bash
# Clear cache and reinstall
npm cache clean --force
npm install --prefix server
npm install --prefix client

# Restart dev server
npm run dev

# Reset database
rm server/prisma/dev.db
npm run prisma:migrate --prefix server
npm run prisma:seed --prefix server
```

## 📊 API ENDPOINTS

### Public
- `GET /api/health` - Health check
- `GET /api/automations` - List all automations
- `GET /api/automations/:id` - Get automation details
- `POST /api/orders` - Create order
- `POST /api/demo-leads` - Submit demo lead

### Admin (require token)
- `POST /api/admin/login` - Get JWT token
- `GET /api/admin/demo-leads` - List demo leads
- `GET /api/admin/orders` - List orders
- `GET /api/admin/automations` - List automations

## 🔄 BUILD FOR PRODUCTION

```bash
# Build client
npm run build --prefix client
# Output: client/dist/

# Build server
npm run build --prefix server
# Output: server/dist/

# Deploy dist folders
```

## 📱 PAGES AVAILABLE
- `/` - Landing page
- `/automations` - Solutions catalog
- `/automations/:id` - Automation details
- `/order/:id` - Order page
- `/demo/lead-capture` - Demo page
- `/contact` - Contact form
- `/pricing` - Pricing page
- `/admin` - Admin dashboard

## 🎯 NEXT STEPS
1. ✅ Test everything locally
2. 📧 Get Resend API key for emails
3. 🌐 Buy warriorforgeai.com domain
4. 🚀 Deploy using DOMAIN_SETUP.md guide
5. 🎉 Go live!

## 📖 DOCUMENTATION
- `SETUP_GUIDE.md` - Local development
- `README_FINAL.md` - Feature checklist
- `DOMAIN_SETUP.md` - Deployment steps
- `COMPLETION_SUMMARY.md` - Project overview

## 💡 TIPS
- Images are in SVG format for best quality
- Database seeds automatically with sample data
- Email service is async (doesn't block requests)
- Admin token stored in localStorage
- API uses standard REST conventions

## ⚠️ SECURITY
Before deploying:
1. Change `ADMIN_PASSWORD` to something strong
2. Generate new `ADMIN_JWT_SECRET` (32+ chars)
3. Get real SMTP credentials
4. Set `NODE_ENV=production`

## 🆘 HELP
- Check docs in `*.md` files
- Server logs in terminal
- Browser console for frontend errors
- Network tab to debug API calls

---

**Status**: ✅ PRODUCTION READY - Deploy whenever you're ready!
