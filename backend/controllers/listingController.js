import  db  from "../config/db.js";

export const getAllListings = (req, res) => {
  const sql = "SELECT * FROM listing";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

export const getListingById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM LISTING WHERE listing_id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    if (data.length === 0)
      return res.status(404).json({ message: "Listing not found" });
    res.json(data[0]);
  });
};
