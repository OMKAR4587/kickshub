import { Router } from "express";

import {
  createCheckoutSessionController,
} from "../controllers/payment.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.post(
  "/create-checkout-session",
  createCheckoutSessionController,
);

export default router;