# Server Deployment (WarriorForge Automations)

This document describes how to deploy the Node/Express backend for WarriorForge Automations.

Required environment variables (production):

- `DATABASE_URL` - full database connection string (e.g. Postgres URL) or `file:./dev.db` for SQLite.
- `CORS_ORIGIN` - the frontend origin (e.g. `https://warriorforgeai.com`).
- `ADMIN_EMAIL` - admin email used for JWT subject.
- `ADMIN_JWT_SECRET` - secret used to sign admin JWT tokens.
- `SMTP_HOST` - SMTP server (e.g. `smtp.gmail.com`).
- `SMTP_PORT` - SMTP port (e.g. `587`).
- `SMTP_USER` - SMTP username (email address).
- `SMTP_PASS` - SMTP password or app password.
- `SMTP_SECURE` - `true` or `false` (usually `false` for port 587).

Optional (dev-only):

- `ADMIN_PASSWORD` - plain-text admin password fallback for local/dev convenience.
- `ADMIN_PASSWORD_HASH` - bcrypt hash of the admin password (preferred in production).

Quick start (Render / any Node host):

1. Install dependencies: `npm ci`
2. Run Prisma migrations (if using Postgres): `npx prisma migrate deploy`
3. Generate Prisma client (if needed): `npx prisma generate`
4. Build: `npm run build`
5. Start: `npm run start`

For Render or similar, configure a service that runs `npm ci && npm run build` during deploy and `npm run start` to run the process.
