import express from "express";
import {
  getAllListings,
  getListingById,
  addListing,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";

const router = express.Router();

// Get all listings
router.get("/", getAllListings);

// Get listing by ID
router.get("/:id", getListingById);

// Add new listing
router.post("/", addListing);

// Update listing
router.put("/:id", updateListing);

// Delete listing
router.delete("/:id", deleteListing);

export default router;
