const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

// READ - dengan JOIN ke categories
router.get("/", auth, (req, res) => {
  db.query(
    "SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.category_id = categories.id",
    (err, result) => {

      if (err) {
        console.log(err);
        return res.send("Query Error");
      }

      res.render("dashboard", {
        data: result || []
      });

    }
  );
});

// CREATE FORM
router.get("/add", auth, (req, res) => {
  db.query("SELECT * FROM categories", (err, categories) => {
    res.render("add", { categories: categories });
  });
});

// CREATE
router.post("/add", auth, (req, res) => {
  const { name, price, stock, category_id } = req.body;
  
  db.query("INSERT INTO products SET ?", { name, price, stock, category_id }, () => {
    res.redirect("/products");
  });
});

// EDIT FORM
router.get("/edit/:id", auth, (req, res) => {
  db.query("SELECT * FROM products WHERE id=?", [req.params.id], (err, result) => {
    db.query("SELECT * FROM categories", (err, categories) => {
      res.render("edit", { data: result[0], categories: categories });
    });
  });
});

// UPDATE
router.post("/edit/:id", auth, (req, res) => {
  const { name, price, stock, category_id } = req.body;
  
  db.query(
    "UPDATE products SET name=?, price=?, stock=?, category_id=? WHERE id=?",
    [name, price, stock, category_id, req.params.id],
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
