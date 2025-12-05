# WarriorForge Monorepo

**Mission**: We forge AI systems that capture leads, book appointments, automate support, and make businesses battle-ready.

A production-ready monorepo for the WarriorForge Automations platform. This workspace contains a TypeScript Express API backend, a React + Vite frontend storefront, and shared TypeScript types for seamless full-stack development.

## Tech Stack

### Backend (`/backend`)

- **Node.js + Express** - REST API server
- **TypeScript** - Type-safe development
- **Prisma ORM** - Database toolkit with SQLite
- **Nodemailer** - Email notifications
- **dotenv** - Environment configuration

### Frontend (`/frontend`)

- **React 19** - UI framework
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type-safe components
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first styling

### Shared (`/shared`)

- **TypeScript interfaces** - Shared types between backend and frontend

## Project Structure

```
warriorforge-monorepo/
├── backend/           # Backend API (Express + Prisma)
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── db/
│   │   ├── types/
│   │   └── integrations/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── package.json
├── frontend/          # Frontend storefront (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── lib/
│   │   └── types/
│   └── package.json
├── shared/            # Shared TypeScript interfaces
│   └── types.ts
├── package.json       # Root workspace configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm 9+ package manager

### Quick Setup (Recommended)

From the root directory, run:

```bash
# Install all dependencies for both backend and frontend
npm install

# Run both backend and frontend in development mode
npm run dev
```

This will start:
- Backend API at **http://localhost:4000**
- Frontend at **http://localhost:5173**

### Manual Setup

#### 1. Install Dependencies

```bash
# From root - installs all workspace dependencies
npm install
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create environment file
cp .env.example .env

# Edit backend/.env and fill in your values:
# - ADMIN_EMAIL: Your admin notification email
# - ADMIN_PASSWORD: Password for admin routes
# - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS: Email server config
```

**Backend Environment Variables** (`backend/.env`):

```env
PORT=4000
CORS_ORIGIN=http://localhost:5173

DATABASE_URL="file:./dev.db"

ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=supersecretpassword

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_gmail_app_password
SMTP_SECURE=false
```

> **Gmail Setup**: Create an App Password in Google Account Security → 2-Step Verification → App Passwords. Use that as `SMTP_PASS`.

```bash
# Initialize database
npx prisma migrate dev --name init

# Seed the database with sample automations
npx prisma db seed

# Start development server
npm run dev
```

The API will be running at **http://localhost:4000**

#### 3. Frontend Setup

The frontend is pre-configured and will connect to the backend automatically.

```bash
# Start frontend development server (from root)
npm run dev:frontend
```

The frontend will be running at **http://localhost:5173**

## NPM Workspace Scripts

Run these commands from the **root directory**:

### Development

```bash
# Start both backend and frontend
npm run dev

# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend
```

### Build

```bash
# Build both backend and frontend
npm run build

# Build backend only
npm run build:backend

# Build frontend only
npm run build:frontend
```

### Production

```bash
# Start backend in production mode
npm run start:backend

# Preview frontend production build
npm run preview:frontend
```

### Other

```bash
# Run frontend linter
npm run lint:frontend

# Install all dependencies
npm run install:all
```

## API Endpoints

### Public Endpoints

- `GET /api/health` - Health check
- `GET /api/automations` - List all automations
- `GET /api/automations/:id` - Get single automation
- `POST /api/orders` - Create new order
- `POST /api/demo-leads` - Submit demo lead
- `POST /api/pay` - Payment endpoint (Stripe placeholder)

### Admin Endpoints (require x-admin-token header)

- `POST /api/admin/login` - Admin login
- `GET /api/admin/automations` - List automations
- `POST /api/admin/automations` - Create automation
- `PUT /api/admin/automations/:id` - Update automation
- `DELETE /api/admin/automations/:id` - Delete automation
- `GET /api/admin/orders` - List all orders
- `GET /api/admin/orders/:id` - Get order details
- `GET /api/admin/demo-leads` - List demo leads
- `GET /api/admin/demo-leads/:id` - Get demo lead details

## Frontend Routes

### Public Routes

- `/` - Landing page with hero and featured automations
- `/automations` - Browse all automations
- `/automations/:id` - Automation detail page
- `/order/:automationId` - Order form
- `/order-success` - Order confirmation
- `/demo/lead-capture` - Live demo: Lead Capture
- `/demo/support-inbox` - Live demo: Support Inbox
- `/demo/appointment-setter` - Live demo: Appointment Setter

### Admin Routes

- `/admin/login` - Admin login
- `/admin` - Admin dashboard overview
- `/admin/automations` - Manage automations
- `/admin/orders` - View orders
- `/admin/orders/:id` - Order detail
- `/admin/demo-leads` - View demo leads
- `/admin/demo-leads/:id` - Demo lead detail

## Features

### Core Features

- ✅ Full-stack TypeScript monorepo with npm workspaces
- ✅ REST API with Express + Prisma
- ✅ React 19 frontend with Vite
- ✅ SQLite database (easily swap to PostgreSQL/MySQL)
- ✅ Email notifications via Nodemailer
- ✅ Admin authentication with token-based auth
- ✅ Responsive design with TailwindCSS
- ✅ Live demo chat simulations
- ✅ Demo lead capture system

### Automation Catalog

Pre-seeded with 6 battle-tested automations:

1. AI Lead Capture & Follow-Up System
2. AI Appointment Setter
3. AI Customer Support Inbox
4. AI Review & Reputation Engine
5. AI Content Engine
6. Custom AI Automation (Strategy Call)

### Admin Dashboard

- Manage automation catalog
- View and track orders
- Monitor demo leads from live demos
- Protected routes with admin authentication

### Live Demos

Interactive chat simulations for:

- Lead capture workflows
- Customer support automation
- Appointment scheduling
- Automatic demo lead collection

## Development Notes

### Database

- Using SQLite for development (zero config)
- Prisma schema located at `backend/prisma/schema.prisma`
- To reset database: `cd backend && npx prisma migrate reset`
- To view data: `cd backend && npx prisma studio`

### Type Safety

- Shared types in `/shared/types.ts`
- Backend uses Prisma-generated types + DTOs
- Frontend imports types from `/frontend/src/types/`
- DTO conversion functions in `backend/src/types/dto.ts`

### Email Notifications

- New orders trigger email to `ADMIN_EMAIL`
- Demo leads trigger email notifications
- Configure SMTP settings in `backend/.env`

## Troubleshooting

### Backend won't start

- Check `backend/.env` file exists
- Verify `DATABASE_URL` is set
- Run `cd backend && npx prisma generate` again

### Frontend won't start

- Make sure backend is running first
- Check that backend is accessible at http://localhost:4000
- Try deleting `frontend/node_modules` and running `npm install` from root

### No emails arriving

- Check Gmail App Password is correct
- Verify `ADMIN_EMAIL` is your real email
- Check spam folder
- Test SMTP settings

### TypeScript errors

- Reload VS Code window (Ctrl+Shift+P → "Reload Window")
- Most errors are editor cache issues
- Run `npm install` from root to ensure all dependencies are installed

## Production Deployment

See the deployment documentation for detailed instructions:

- [QUICK-DEPLOY.md](./docs/QUICK-DEPLOY.md) - Fast-track deployment to Vercel
- [VERCEL-DEPLOYMENT.md](./docs/VERCEL-DEPLOYMENT.md) - Complete Vercel deployment guide
- [DEPLOYMENT-CHECKLIST.md](./docs/DEPLOYMENT-CHECKLIST.md) - Pre-deployment checklist

### Quick Production Notes

#### Backend

1. Set `NODE_ENV=production`
2. Use PostgreSQL instead of SQLite for production
3. Run `npm run build:backend`
4. Start with `npm run start:backend`
5. Set up reverse proxy (nginx)
6. Configure SSL certificates

#### Frontend

1. Run `npm run build:frontend`
2. Serve `frontend/dist/` folder via static hosting
3. Set `VITE_API_BASE_URL` to production API URL

### Database Migration for Production

Update `DATABASE_URL` in `backend/.env` to PostgreSQL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/warriorforge"
```

Then run migrations:

```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

## Support

For issues or questions about this codebase, check:

- Backend logs in terminal running backend server
- Frontend console in browser DevTools
- Prisma Studio for database inspection: `cd backend && npx prisma studio`

---

**Built with ⚔️ by WarriorForge Automations**  
_Forging businesses into revenue machines, one automation at a time._