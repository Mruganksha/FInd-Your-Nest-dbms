// backend/routes/bookingRoutes.js
import express from "express";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🏠 Create a new booking (protected)
router.post("/", verifyToken, createBooking);

// 📅 Get all bookings for the logged-in user
router.get("/", verifyToken, getUserBookings);

export default router;
