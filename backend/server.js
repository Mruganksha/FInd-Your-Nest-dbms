import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import  db  from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import roommateRoutes from './routes/roommateRoutes.js';

dotenv.config();
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Find Your Nest API Running"));

app.get("/api/health", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, results) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.json({ ok: true, db: results[0] });
  });
});

app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reports", reportRoutes);
app.use('/api/roommates', roommateRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err?.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
