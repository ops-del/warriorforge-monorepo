import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

export function adminAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.header("authorization");
  const headerToken = header?.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : undefined;
  const token = req.header("x-admin-token") || headerToken;

  if (!token) return next(new AppError("Unauthorized", 401));

  try {
    jwt.verify(token, String(env.ADMIN_JWT_SECRET));
    return next();
  } catch (err) {
    return next(new AppError("Unauthorized", 401));
  }
}
