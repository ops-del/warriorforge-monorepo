# Client Deployment (WarriorForge Automations)

This document explains how to deploy the frontend to Vercel or Netlify.

Required env vars:

- `VITE_API_BASE_URL` - the public URL to the backend API (e.g. `https://api.warriorforgeai.com`).
- `VITE_CALENDLY_URL` - (optional) your Calendly booking URL.

Vercel quick deploy:

1. Connect the `client` folder as a Vercel project.
2. Set build command: `npm run build` and output directory: `dist` (Vite default).
3. Add environment variables in the Vercel dashboard.

Netlify quick deploy:

1. Set build command: `npm run build` and publish directory: `dist`.
2. Add env var `VITE_API_BASE_URL` in site settings.
