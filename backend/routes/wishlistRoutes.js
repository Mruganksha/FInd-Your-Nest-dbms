// backend/routes/wishlistRoutes.js
import express from "express";
import { addWishlist, getWishlist, removeWishlist } from "../controllers/wishlistController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Add to wishlist
router.post("/", verifyToken, addWishlist);

// 📋 Get user's wishlist
router.get("/", verifyToken, getWishlist);

// ❌ Remove from wishlist
router.delete("/:id", verifyToken, removeWishlist);

export default router;
