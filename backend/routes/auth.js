// routes/auth.js
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcrypt");

const dbPath = path.join(__dirname, "..", "db", "database.sqlite");
const db = new sqlite3.Database(dbPath);

// ✅ Signup - Store full profile
router.post("/signup", async (req, res) => {
  const { email, password, phone, gender, dob, address_line1, address_line2 } =
    req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users 
        (email, password, phone, gender, dob, address_line1, address_line2)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [email, hashedPassword, phone, gender, dob, address_line1, address_line2],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            return res.status(409).json({ error: "Email already registered" });
          }
          return res
            .status(500)
            .json({ error: "Signup failed: " + err.message });
        }

        return res
          .status(200)
          .json({ message: "Signup successful", user_id: this.lastID });
      }
    );
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], async (err, row) => {
    if (err) return res.status(500).json({ error: "Login failed" });

    if (!row)
      return res.status(401).json({ error: "Invalid email or password" });

    const match = await bcrypt.compare(password, row.password);
    if (!match)
      return res.status(401).json({ error: "Invalid email or password" });

    return res
      .status(200)
      .json({ message: "Login successful", user_id: row.id });
  });
});

// ✅ Get Profile
router.get("/profile/:id", (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT 
      id, email, phone, gender, dob, address_line1, address_line2 
    FROM users WHERE id = ?
  `;

  db.get(query, [userId], (err, row) => {
    if (err)
      return res.status(500).json({ error: "Failed to fetch user profile" });

    if (!row) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(row);
  });
});

module.exports = router;
