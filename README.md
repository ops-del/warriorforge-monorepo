# WarriorForge Automations Monorepo

**A unified platform for automation business SaaS and Luma integration** – featuring a scalable Express backend, modern React frontend, and integrated database layer.

[![CI/CD](https://github.com/ops-del/warriorforge-monorepo/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/ops-del/warriorforge-monorepo/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Quick Links

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## ✨ Features

- **Monorepo Architecture** – Unified workspaces for backend, frontend, and shared types
- **Express + TypeScript Backend** – RESTful API with JWT auth, email integration, and Prisma ORM
- **React + Vite Frontend** – Modern UI with Tailwind CSS, routing, and HMR
- **Database Integration** – Prisma migrations, seeding, and PostgreSQL support
- **CI/CD Automation** – GitHub Actions for linting, building, testing, and deployment
- **Vercel & Railway Ready** – Pre-configured for serverless and container deployment

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, TypeScript, Tailwind CSS, React Router |
| **Backend** | Express.js, Node.js, TypeScript, Prisma, PostgreSQL |
| **Shared** | TypeScript types and utilities |
| **Infrastructure** | Vercel (frontend), Railway (backend), PostgreSQL |
| **CI/CD** | GitHub Actions |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.x or 20.x
- **npm** 9.x+
- **PostgreSQL** 14+

### Install & Setup

```bash
# Clone and install
git clone https://github.com/ops-del/warriorforge-monorepo.git
cd warriorforge-monorepo
npm install

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and other values

# Initialize database
npm run db:generate
npm run db:migrate
npm run db:seed

# Start development
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

---

## 📜 Scripts

### Development
```bash
npm run dev              # Start both backend and frontend
npm run dev:backend      # Backend server only (Express + nodemon)
npm run dev:frontend     # Frontend only (Vite dev server)
```

### Building
```bash
npm run build            # Build both backend and frontend
npm run build:backend    # Build backend only
npm run build:frontend   # Build frontend only
npm run build:prod       # Production build via script
```

### Database
```bash
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Create and run migrations
npm run db:seed          # Seed database with initial data
```

### Quality Assurance
```bash
npm run lint             # Lint frontend code (ESLint)
npm run test:full        # Run full test suite
npm run pre-commit       # Run pre-commit checks
npm run clean:all        # Clean all node_modules and dist
```

### Deployment & Other
```bash
npm run deploy           # Deploy frontend to Vercel
npm run setup            # Fresh install and database setup
```

---

## 📁 Project Structure

```
warriorforge-monorepo/
├── backend/                    # Express API server
│   ├── src/
│   │   ├── index.ts
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── package.json
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── router/
│   │   └── styles/
│   ├── vite.config.ts
│   └── package.json
├── shared/                     # Shared types
│   └── src/
├── docs/                       # Documentation
├── scripts/                    # Automation scripts (bash & PowerShell)
├── .github/workflows/          # GitHub Actions CI/CD
├── .env.example                # Environment template
├── .gitignore
├── LICENSE
└── package.json
```

---

## 🔐 Environment Variables

Create `.env` from `.env.example`:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/warriorforge

# Authentication
JWT_SECRET=your-super-secret-key-min-32-chars

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend API
VITE_API_URL=http://localhost:4000

# Environment
NODE_ENV=development
```

---

## 🚢 Deployment

### Frontend (Vercel)

```bash
npm run deploy
# Or manual setup: cd frontend && vercel --prod
```

### Backend (Railway)

1. Link project: `railway link`
2. Configure environment variables in Railway dashboard
3. Deploy: `railway up`

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

---

## 🧪 Quality Assurance

### Pre-Commit Hooks (Optional)

```bash
# Setup (macOS/Linux)
cp scripts/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### GitHub Actions CI/CD

Every push/PR triggers:
- ✅ Linting (ESLint)
- ✅ Build verification
- ✅ Security audit (npm audit)
- ✅ Auto-deploy to Vercel (on main)

---

## 🔧 Troubleshooting

### Port Conflicts
```bash
# Check port 4000 (backend)
lsof -i :4000  # macOS/Linux
Get-NetTCPConnection -LocalPort 4000  # Windows
```

### Database Issues
```bash
# Reset database
npm run db:migrate -- --skip-generate
```

### Build Errors
```bash
npm run clean:all
npm install
npm run build
```

---

## 📊 Repository Hygiene

- ✅ `.gitignore` – Node, build, and environment files
- ✅ `LICENSE` – MIT license
- ✅ `.env.example` – Environment template
- ✅ `.github/workflows/` – CI/CD automation
- ✅ `scripts/` – Build and deploy helpers
- ✅ Pre-commit hooks – Linting before commits

---

## 📚 Resources

- [Express Documentation](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Prisma ORM](https://www.prisma.io/docs/)
- [Vite Guide](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📄 License

MIT License – see [LICENSE](LICENSE) for details.

**Built with ❤️ for WarriorForge Automations**
