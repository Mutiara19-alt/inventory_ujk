const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

<<<<<<< HEAD
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
=======
// READ
router.get("/", auth, (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    res.render("dashboard", { data: result });
  });
>>>>>>> 7c39210082809b86e933e79e482bf791477d4178
});

// CREATE FORM
router.get("/add", auth, (req, res) => {
<<<<<<< HEAD
  db.query("SELECT * FROM categories", (err, categories) => {
    res.render("add", { categories: categories });
  });
=======
  res.render("add");
>>>>>>> 7c39210082809b86e933e79e482bf791477d4178
});

// CREATE
router.post("/add", auth, (req, res) => {
<<<<<<< HEAD
  const { name, price, stock, category_id } = req.body;
  
  db.query("INSERT INTO products SET ?", { name, price, stock, category_id }, () => {
=======
  const { name, price, stock } = req.body;
  
  db.query("INSERT INTO products SET ?", { name, price, stock }, () => {
>>>>>>> 7c39210082809b86e933e79e482bf791477d4178
    res.redirect("/products");
  });
});

// EDIT FORM
router.get("/edit/:id", auth, (req, res) => {
  db.query("SELECT * FROM products WHERE id=?", [req.params.id], (err, result) => {
<<<<<<< HEAD
    db.query("SELECT * FROM categories", (err, categories) => {
      res.render("edit", { data: result[0], categories: categories });
    });
=======
    res.render("edit", { data: result[0] });
>>>>>>> 7c39210082809b86e933e79e482bf791477d4178
  });
});

// UPDATE
router.post("/edit/:id", auth, (req, res) => {
<<<<<<< HEAD
  const { name, price, stock, category_id } = req.body;
  
  db.query(
    "UPDATE products SET name=?, price=?, stock=?, category_id=? WHERE id=?",
    [name, price, stock, category_id, req.params.id],
=======
  const { name, price, stock } = req.body;
  
  db.query(
    "UPDATE products SET name=?, price=?, stock=? WHERE id=?",
    [name, price, stock, req.params.id],
>>>>>>> 7c39210082809b86e933e79e482bf791477d4178
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
