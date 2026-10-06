import { Router } from "express";

import {
  createOrderController,
} from "../controllers/order.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/", createOrderController);

export default router;