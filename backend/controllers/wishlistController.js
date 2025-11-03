import  db  from "../config/db.js";

export const addWishlist = (req, res) => {
  const user_id = req.user.id;
  const { listing_id } = req.body;
  const sql =
    "INSERT INTO WISHLIST (user_id, listing_id, added_on) VALUES (?, ?, NOW())";
  db.query(sql, [user_id, listing_id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Added to wishlist" });
  });
};

export const getWishlist = (req, res) => {
  const user_id = req.user.id;
  const sql =
    "SELECT L.* FROM WISHLIST W JOIN LISTING L ON W.listing_id=L.listing_id WHERE W.user_id=?";
  db.query(sql, [user_id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
};

export const removeWishlist = (req, res) => {
  const user_id = req.user.id;
  const listing_id = req.params.id;
  const sql = "DELETE FROM WISHLIST WHERE user_id = ? AND listing_id = ?";
  db.query(sql, [user_id, listing_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Removed from wishlist' });
  });
};
