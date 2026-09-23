import dotenv from 'dotenv'

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  jwtSecret: process.env.JWT_SECRET || "kickshub_dev_secret",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};