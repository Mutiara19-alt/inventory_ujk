const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_db"
});

async function createUser() {
  const username = "admin";
  const password = await bcrypt.hash("123456", 10);
  
  db.query("INSERT INTO users (username, password) VALUES (?, ?)", 
    [username, password], 
    (err, result) => {
      if (err) throw err;
      console.log("User berhasil dibuat!");
      console.log("Username: admin");
      console.log("Password: 123456");
      db.end();
    }
  );
}

createUser();
