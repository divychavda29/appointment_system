// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Import auth route
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const appointmentRoutes = require("./routes/appointments");
app.use("/api/appointments", appointmentRoutes);

// Connect to SQLite DB
const db = new sqlite3.Database(
  path.join(__dirname, "db", "database.sqlite"),
  (err) => {
    if (err) return console.error("❌ DB Error:", err.message);
    console.log("🟢 Connected to SQLite database.");
  }
);

// Create Users and Appointments tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT,
  email TEXT UNIQUE,
  password TEXT
)

  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      doctor TEXT,
      date TEXT,
      message TEXT
    )
  `);
});

// Simple route to test
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
