import  db  from "../config/db.js";

export const reportListing = (req, res) => {
  const user_id = req.user.id;
  const { listing_id, reason } = req.body;
  const sql =
    "INSERT INTO REPORT (listing_id, user_id, reason, report_date, status) VALUES (?, ?, ?, NOW(), 'Pending')";
  db.query(sql, [listing_id, user_id, reason], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Report submitted" });
  });
};

export const getReports = (req, res) => {
  const sql = "SELECT * FROM REPORT";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};


export const getReportsByListing = (req, res) => {
  const { listing_id } = req.params;
  const sql = "SELECT * FROM REPORT WHERE listing_id = ? ORDER BY report_date DESC";

  db.query(sql, [listing_id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};