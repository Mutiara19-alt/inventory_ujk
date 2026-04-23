const jwt = require("jsonwebtoken");
const SECRET = "secret123";

function auth(req, res, next) {
  const token = req.cookies.token;
  
  if (!token) return res.redirect("/");
  
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.redirect("/");
  }
}

module.exports = auth;
