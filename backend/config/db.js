// backend/config/db.js
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3305,  // 👈 keep 3305 as default
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "findyournest",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// Optional: check connection once on startup
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database (connection pool ready)");
    connection.release();
  }
});

export default db;
