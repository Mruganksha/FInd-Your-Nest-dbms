import  db  from "../config/db.js";

export const getAllListings = (req, res) => {
  // Support basic query params for searching/filtering
  // Accepted query params: q (search text), city, minRent, maxRent, gender
  const { q, city, minRent, maxRent, gender } = req.query;
  // aggregate facilities and review metrics so frontend can display them in listing cards
  // We'll left join listing_facility -> facility and review to compute amenities and avg_rating
  let sql = `SELECT L.*, 
    GROUP_CONCAT(DISTINCT F.facility_name) AS facilities_csv,
    ROUND(AVG(R.rating),1) AS avg_rating,
    COUNT(DISTINCT R.review_id) AS review_count
    FROM listing L
    LEFT JOIN listing_facility LF ON L.listing_id = LF.listing_id
    LEFT JOIN facility F ON LF.facility_id = F.facility_id
    LEFT JOIN review R ON L.listing_id = R.listing_id`;
  const where = [];
  const params = [];

  if (q) {
    where.push("(name LIKE ? OR address LIKE ? OR city LIKE ?)");
    const like = `%${q}%`;
    params.push(like, like, like);
  }
  if (city) {
    where.push("city = ?");
    params.push(city);
  }
  if (minRent) {
    where.push("rent >= ?");
    params.push(minRent);
  }
  if (maxRent) {
    where.push("rent <= ?");
    params.push(maxRent);
  }
  if (gender) {
    where.push("gender_preference = ?");
    params.push(gender);
  }

  if (where.length > 0) sql += " WHERE " + where.join(" AND ");

  sql += " GROUP BY L.listing_id";

  // support sorting
  const sort = req.query.sort;
  if (sort === 'price_asc') sql += " ORDER BY rent ASC";
  else if (sort === 'price_desc') sql += " ORDER BY rent DESC";
  else sql += " ORDER BY added_on DESC";

  db.query(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    // map rows to include amenities array and numeric avg_rating
    const data = rows.map(r => ({
      ...r,
      amenities: r.facilities_csv ? r.facilities_csv.split(',') : [],
      avg_rating: r.avg_rating ? Number(r.avg_rating) : null,
      review_count: r.review_count ? Number(r.review_count) : 0
    }));
    res.json(data);
  });
};

export const getListingById = (req, res) => {
  const { id } = req.params;
  // Return listing plus facilities, reviews and owner contact
  const listingSql = "SELECT L.*, U.name as owner_name, U.phone as owner_phone FROM listing L JOIN user U ON L.owner_id=U.user_id WHERE L.listing_id = ?";
  const facilitiesSql = "SELECT F.facility_name FROM listing_facility LF JOIN facility F ON LF.facility_id=F.facility_id WHERE LF.listing_id = ?";
  const reviewsSql = "SELECT R.*, U.name as user_name FROM review R LEFT JOIN user U ON R.user_id=U.user_id WHERE R.listing_id = ? ORDER BY R.review_date DESC";

  db.query(listingSql, [id], (err, listingData) => {
    if (err) return res.status(500).json({ error: err });
    if (listingData.length === 0)
      return res.status(404).json({ message: "Listing not found" });
    const listing = listingData[0];

    db.query(facilitiesSql, [id], (err2, facData) => {
      if (err2) return res.status(500).json({ error: err2 });
      const amenities = facData.map(f => f.facility_name);

      db.query(reviewsSql, [id], (err3, revData) => {
        if (err3) return res.status(500).json({ error: err3 });

        // shape result
        res.json({
          ...listing,
          amenities,
          reviews: revData
        });
      });
    });
  });
};
