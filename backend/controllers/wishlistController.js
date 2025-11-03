import db from "../config/db.js";

// ✅ ADD TO WISHLIST
export const addWishlist = (req, res) => {
  const user_id = req.user?.user_id;
  const listing_id = req.body.listing_id || req.body.id;

  console.log("🧾 Wishlist add:", { user_id, listing_id, body: req.body });

  if (!listing_id || !user_id) {
    return res.status(400).json({ message: "Missing user_id or listing_id" });
  }

  const sql = "INSERT INTO wishlist (user_id, listing_id, added_on) VALUES (?, ?, NOW())";

  db.query(sql, [user_id, listing_id], (err) => {
    if (err) {
      console.error("❌ Wishlist insert error:", err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ message: "Already in wishlist" });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Added to wishlist" });
  });
};


// ✅ GET USER’S WISHLIST
export const getWishlist = (req, res) => {
  const user_id = req.user.user_id; // ✅ fixed

 const sql = `
  SELECT 
    L.listing_id,
    L.name,
    L.address,
    L.city,
    L.rent,
    L.gender_preference,
    L.available_rooms,
    L.verified,
    L.contact_number,
    L.latitude,
    L.longitude,
    MAX(W.added_on) AS added_on,
    GROUP_CONCAT(F.facility_name) AS amenities
  FROM WISHLIST W 
  JOIN LISTING L ON W.listing_id = L.listing_id 
  LEFT JOIN LISTING_FACILITY LF ON L.listing_id = LF.listing_id
  LEFT JOIN FACILITY F ON LF.facility_id = F.facility_id
  WHERE W.user_id = ?
  GROUP BY L.listing_id
  ORDER BY added_on DESC
`;



  db.query(sql, [user_id], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    const formattedData = data.map((item) => ({
      ...item,
      amenities: item.amenities ? item.amenities.split(",") : [],
    }));

    res.json(formattedData);
  });
};

// ✅ REMOVE FROM WISHLIST
export const removeWishlist = (req, res) => {
  const user_id = req.user.user_id; // ✅ fixed
  const listing_id = req.params.id || req.body.id || req.body.listing_id;

  if (!listing_id) {
    return res.status(400).json({ message: "listing_id is required" });
  }

  const sql = "DELETE FROM WISHLIST WHERE user_id = ? AND listing_id = ?";

  db.query(sql, [user_id, listing_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    res.json({ message: "Removed from wishlist" });
  });
};
