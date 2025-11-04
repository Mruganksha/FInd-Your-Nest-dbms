import express from 'express';
import { reportListing, getReports, getReportsByListing } from '../controllers/reportController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit a report
router.post('/', verifyToken, reportListing);

// Get all reports (admin maybe later)
router.get('/', getReports);

//  NEW: Get reports for a specific listing
router.get('/:listing_id', getReportsByListing);

export default router;
