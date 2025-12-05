import dotenv from "dotenv";

dotenv.config();

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = value ? Number(value) : NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

const isProd = (process.env.NODE_ENV || "development") === "production";

const envRaw = {
  PORT: toNumber(process.env.PORT, 4000),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? (isProd ? undefined : "http://localhost:5173"),
  DATABASE_URL: process.env.DATABASE_URL ?? (isProd ? undefined : "file:./dev.db"),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET ?? (isProd ? undefined : "dev-admin-secret"),
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: toNumber(process.env.SMTP_PORT, 587),
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_SECURE: (process.env.SMTP_SECURE ?? "false").toLowerCase() === "true",
} as const;

const requiredInProd: (keyof typeof envRaw)[] = [
  "CORS_ORIGIN",
  "DATABASE_URL",
  "ADMIN_EMAIL",
  "ADMIN_JWT_SECRET",
];

for (const key of requiredInProd) {
  if (isProd && !envRaw[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = envRaw;
