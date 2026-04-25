const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

// READ - Daftar Kategori
router.get("/", auth, (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    res.render("categories", { data: result });
  });
});

// CREATE FORM
router.get("/add", auth, (req, res) => {
  res.render("addCategory");
});

// CREATE
router.post("/add", auth, (req, res) => {
  const { name, description } = req.body;
  
  db.query("INSERT INTO categories (name, description) VALUES (?, ?)", 
    [name, description], 
    (err) => {
      if (err) return res.send("Error: " + err.message);
      res.redirect("/categories");
    }
  );
});

// EDIT FORM
router.get("/edit/:id", auth, (req, res) => {
  db.query("SELECT * FROM categories WHERE id=?", [req.params.id], (err, result) => {
    res.render("editCategory", { data: result[0] });
  });
});

// UPDATE
router.post("/edit/:id", auth, (req, res) => {
  const { name, description } = req.body;
  
  db.query(
    "UPDATE categories SET name=?, description=? WHERE id=?",
    [name, description, req.params.id],
    () => res.redirect("/categories")
  );
});

// DELETE
router.get("/delete/:id", auth, (req, res) => {
  db.query("DELETE FROM categories WHERE id=?", [req.params.id], (err) => {
    if (err) return res.send("Error: Kategori masih digunakan oleh produk");
    res.redirect("/categories");
  });
});

module.exports = router;
