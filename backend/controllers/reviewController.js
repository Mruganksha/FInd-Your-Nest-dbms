import { db } from "../config/db.js";

export const addReview = (req, res) => {
  const { listing_id, rating, comment } = req.body;
  const user_id = req.user.id;
  const sql =
    "INSERT INTO REVIEW (listing_id, user_id, rating, comment, review_date) VALUES (?, ?, ?, ?, NOW())";
  db.query(sql, [listing_id, user_id, rating, comment], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Review added successfully" });
  });
};

export const getReviewsByListing = (req, res) => {
  const { listing_id } = req.params;
  const sql = "SELECT * FROM REVIEW WHERE listing_id = ?";
  db.query(sql, [listing_id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};
