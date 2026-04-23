const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

app.use("/", require("./routes/auth"));
app.use("/products", require("./routes/product"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
