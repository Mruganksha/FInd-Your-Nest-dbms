import  db  from "../config/db.js";

export const addReview = (req, res) => {
  const { listing_id, rating, comment } = req.body;
  const user_id = req.user.id;
  const sql =
    "INSERT INTO REVIEW (listing_id, user_id, rating, comment, review_date) VALUES (?, ?, ?, ?, NOW())";
  db.query(sql, [listing_id, user_id, rating, comment], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    const insertId = result.insertId;
    // return the created review joined with user name
    const reviewSql = `SELECT R.review_id, R.listing_id, R.user_id, R.rating, R.comment, R.review_date, U.name as user_name
      FROM review R LEFT JOIN user U ON R.user_id = U.user_id WHERE R.review_id = ?`;
    db.query(reviewSql, [insertId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.status(201).json({ review: rows[0] });
    });
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
