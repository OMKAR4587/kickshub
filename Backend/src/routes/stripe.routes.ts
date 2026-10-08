import { Router } from "express";

import {
  handleStripeWebhookController,
} from "../controllers/stripe.controller.js";

const router = Router();

router.post(
  "/webhook",
  handleStripeWebhookController,
);

export default router;