const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "db", "database.sqlite");
const db = new sqlite3.Database(dbPath);

// ✅ Book appointment
router.post("/", (req, res) => {
  const { user_id, doctor, date, message } = req.body;

  if (!user_id || !doctor || !date || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `INSERT INTO appointments (user_id, doctor, date, message) VALUES (?, ?, ?, ?)`;

  db.run(query, [user_id, doctor, date, message], function (err) {
    if (err) return res.status(500).json({ error: "Failed to book appointment" });

    return res.status(200).json({
      message: "Appointment booked successfully",
      id: this.lastID,
    });
  });
});

// ✅ Get all appointments for a user
router.get("/", (req, res) => {
  const userId = req.query.user_id;

  if (!userId) return res.status(400).json({ error: "User ID is required" });

  const query = `SELECT * FROM appointments WHERE user_id = ?`;

  db.all(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch appointments" });

    return res.status(200).json({ appointments: rows });
  });
});

// ✅ Cancel appointment
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid appointment ID" });

  const query = `DELETE FROM appointments WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: "Failed to cancel appointment" });

    if (this.changes === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    return res.status(200).json({ message: "Appointment cancelled successfully" });
  });
});

module.exports = router;
