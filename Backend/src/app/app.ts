import express from 'express'
import cors from "cors";

import productRoutes from "../routes/product.routes.js";
import { notFound } from "../middleware/not-found.middleware.js";
import { errorHandler } from "../middleware/error.middleware.js";
import { env } from "../config/env.js";

export const app = express();

app.use(
  cors({
    origin: env.clientUrl,
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "KicksHub API is running",
  });
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);