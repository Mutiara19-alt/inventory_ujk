const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

// READ
router.get("/", auth, (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    res.render("dashboard", { data: result });
  });
});

// CREATE FORM
router.get("/add", auth, (req, res) => {
  res.render("add");
});

// CREATE
router.post("/add", auth, (req, res) => {
  const { name, price, stock } = req.body;
  
  db.query("INSERT INTO products SET ?", { name, price, stock }, () => {
    res.redirect("/products");
  });
});

// EDIT FORM
router.get("/edit/:id", auth, (req, res) => {
  db.query("SELECT * FROM products WHERE id=?", [req.params.id], (err, result) => {
    res.render("edit", { data: result[0] });
  });
});

// UPDATE
router.post("/edit/:id", auth, (req, res) => {
  const { name, price, stock } = req.body;
  
  db.query(
    "UPDATE products SET name=?, price=?, stock=? WHERE id=?",
    [name, price, stock, req.params.id],
    () => res.redirect("/products")
  );
});

// DELETE
router.get("/delete/:id", auth, (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], () => {
    res.redirect("/products");
  });
});

module.exports = router;
