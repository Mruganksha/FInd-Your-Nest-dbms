import db from "../config/db.js";

// ✅ Add a new review
export const addReview = (req, res) => {
  const { listing_id, rating, comment } = req.body;
  const user_id = req.user.id;

  // Basic validation
  if (!listing_id || !rating) {
    return res.status(400).json({ error: "Listing ID and rating are required" });
  }

  // Check rating bounds
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }

  const sql = `
    INSERT INTO review (listing_id, user_id, rating, comment, review_date)
    VALUES (?, ?, ?, ?, NOW())
  `;

  db.query(sql, [listing_id, user_id, rating, comment || ""], (err) => {
    if (err) {
      console.error("Error adding review:", err);
      return res.status(500).json({ error: "Database error while adding review" });
    }
    res.status(201).json({ message: "Review added successfully" });
  });
};

// ✅ Get all reviews for a specific listing
export const getReviewsByListing = (req, res) => {
  const { listing_id } = req.params;

  const sql = `
    SELECT R.review_id, R.rating, R.comment, R.review_date, 
           U.name AS reviewer_name
    FROM review R
    LEFT JOIN user U ON R.user_id = U.user_id
    WHERE R.listing_id = ?
    ORDER BY R.review_date DESC
  `;

  db.query(sql, [listing_id], (err, data) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Database error while fetching reviews" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No reviews found for this listing" });
    }

    res.status(200).json(data);
  });
};
