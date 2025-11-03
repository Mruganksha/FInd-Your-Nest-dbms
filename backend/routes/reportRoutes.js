import express from "express";
import { reportListing, getReports } from "../controllers/reportController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📢 Report a listing (protected)
router.post("/", verifyToken, reportListing);

// 📋 Get all reports (admin view)
router.get("/", getReports);

export default router;
