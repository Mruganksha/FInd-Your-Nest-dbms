// backend/routes/reviewRoutes.js
import express from "express";
import { addReview, getReviewsByListing } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✏️ Add a review (protected)
router.post("/", verifyToken, addReview);

// 📋 Get all reviews for a listing
router.get("/:listing_id", getReviewsByListing);

export default router;
