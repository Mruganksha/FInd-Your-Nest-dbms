import db from "../config/db.js";

// ✅ Submit a report for a listing
export const reportListing = (req, res) => {
  const user_id = req.user.id;
  const { listing_id, reason } = req.body;

  if (!listing_id || !reason) {
    return res.status(400).json({ error: "Listing ID and reason are required" });
  }

  const sql = `
    INSERT INTO report (listing_id, user_id, reason, report_date, status)
    VALUES (?, ?, ?, NOW(), 'Pending')
  `;

  db.query(sql, [listing_id, user_id, reason], (err) => {
    if (err) {
      console.error("Error submitting report:", err);
      return res.status(500).json({ error: "Database error while submitting report" });
    }
    res.status(201).json({ message: "Report submitted successfully" });
  });
};

// ✅ Get all reports (for admin view)
export const getReports = (req, res) => {
  const sql = `
    SELECT R.report_id, R.reason, R.report_date, R.status,
           U.name AS reported_by, L.name AS listing_name
    FROM report R
    LEFT JOIN user U ON R.user_id = U.user_id
    LEFT JOIN listing L ON R.listing_id = L.listing_id
    ORDER BY R.report_date DESC
  `;

  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching reports:", err);
      return res.status(500).json({ error: "Database error while fetching reports" });
    }
    res.status(200).json(data);
  });
};
