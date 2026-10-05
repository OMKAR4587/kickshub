import { Router } from "express";

import {
  getWishlistController,
  addToWishlistController,
  removeFromWishlistController,
} from "../controllers/wishlist.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getWishlistController);
router.post("/", addToWishlistController);
router.delete("/:productId", removeFromWishlistController);

export default router;