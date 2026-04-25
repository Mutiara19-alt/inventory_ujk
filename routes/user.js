const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/authMiddleware");

// READ - Daftar User
router.get("/", auth, (req, res) => {
  db.query("SELECT id, username FROM users", (err, result) => {
    res.render("users", { data: result });
  });
});

// CREATE FORM
router.get("/add", auth, (req, res) => {
  res.render("addUser");
});

// CREATE - Tambah User Baru
router.post("/add", auth, async (req, res) => {
  const { username, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  db.query("INSERT INTO users (username, password) VALUES (?, ?)", 
    [username, hashedPassword], 
    (err) => {
      if (err) return res.send("Error: Username sudah ada");
      res.redirect("/users");
    }
  );
});

// EDIT FORM
router.get("/edit/:id", auth, (req, res) => {
  db.query("SELECT id, username FROM users WHERE id=?", [req.params.id], (err, result) => {
    res.render("editUser", { data: result[0] });
  });
});

// UPDATE - Update User
router.post("/edit/:id", auth, async (req, res) => {
  const { username, password } = req.body;
  
  // Jika password diisi, update dengan password baru
  if (password && password.trim() !== "") {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "UPDATE users SET username=?, password=? WHERE id=?",
      [username, hashedPassword, req.params.id],
      () => res.redirect("/users")
    );
  } else {
    // Jika password kosong, hanya update username
    db.query(
      "UPDATE users SET username=? WHERE id=?",
      [username, req.params.id],
      () => res.redirect("/users")
    );
  }
});

// DELETE
router.get("/delete/:id", auth, (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], () => {
    res.redirect("/users");
  });
});

module.exports = router;
