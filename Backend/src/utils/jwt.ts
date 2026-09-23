import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthPayload } from "../types/auth.js";

export function generateToken(payload: AuthPayload) {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as AuthPayload;
}