import { Router } from "express";
import {
  getCartController,
  addToCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
} from "../controllers/cart.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", getCartController);
router.post("/", addToCartController);
router.patch("/:itemId", updateCartItemController);
router.delete("/:itemId", removeFromCartController);
router.delete("/", clearCartController);

export default router;