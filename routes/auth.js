const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "secret123";

// LOGIN PAGE
router.get("/", (req, res) => {
  res.render("login");
});

// LOGIN PROCESS
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  db.query("SELECT * FROM users WHERE username=?", [username], async (err, result) => {
    if (result.length === 0) return res.send("User tidak ditemukan");
    
    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.send("Password salah");
    
    const token = jwt.sign({ id: user.id }, SECRET);
    
    res.cookie("token", token);
    res.redirect("/products");
  });
});

module.exports = router;
