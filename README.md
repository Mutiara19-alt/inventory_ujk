# Sistem Inventory Sederhana

## Identitas
- **Nama**: Mutiara
- **NIM**: 220101097

## Deskripsi
Aplikasi CRUD produk dengan fitur login menggunakan JWT, password hashing dengan bcrypt, dan proteksi halaman menggunakan middleware authentication.

## Fitur
- Login dengan JWT Authentication
- Password Hashing menggunakan bcryptjs
- CRUD Produk (Create, Read, Update, Delete)
- Proteksi halaman (harus login untuk akses dashboard)
- UI menggunakan EJS + Bootstrap

## Tech Stack
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcryptjs
- **Template Engine**: EJS
- **UI Framework**: Bootstrap 5

## Struktur Database

### 1. Tabel users
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### 2. Tabel products
```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price INT,
    stock INT
);
```

## Cara Setup dan Menjalankan

### 1. Install MySQL
- Download dan install MySQL dari https://dev.mysql.com/downloads/mysql/
- Atau gunakan XAMPP/WAMP yang sudah include MySQL

### 2. Setup Database
Buka MySQL command line atau phpMyAdmin, lalu jalankan:

```sql
-- Buat database
CREATE DATABASE inventory_db;

-- Gunakan database
USE inventory_db;

-- Buat tabel users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Buat tabel products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price INT,
    stock INT
);

-- Insert user demo (password: 123456)
INSERT INTO users (username, password) VALUES 
('admin', '$2a$10$8ZqE5J5YqYqYqYqYqYqYqOK7xKxKxKxKxKxKxKxKxKxKxKxKxKxK');
```

**PENTING**: Password di atas adalah contoh hash. Untuk membuat user baru dengan password yang benar, gunakan script di bawah.

### 3. Buat User dengan Password Hash
Buat file `createUser.js` di root project:

```javascript
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
```

Jalankan: `node createUser.js`

### 4. Konfigurasi Database
Edit file `config/db.js` sesuai konfigurasi MySQL kamu:

```javascript
const db = mysql.createConnection({
  host: "localhost",      // Sesuaikan jika berbeda
  user: "root",           // Username MySQL kamu
  password: "",           // Password MySQL kamu (kosongkan jika tidak ada)
  database: "inventory_db"
});
```

### 5. Install Dependencies
```bash
npm install
```

### 6. Jalankan Aplikasi
```bash
npm start
```

Atau:
```bash
node app.js
```

### 7. Akses Aplikasi
Buka browser dan akses: **http://localhost:3000**

Login dengan:
- **Username**: admin
- **Password**: 123456

## Flow Aplikasi

### 1. Login Flow
- User mengakses `/` → Tampil halaman login
- User input username & password → POST ke `/login`
- System cek username di database
- System verifikasi password dengan bcrypt.compare()
- Jika valid → Generate JWT token → Simpan di cookie → Redirect ke `/products`
- Jika invalid → Tampil pesan error

### 2. Authentication Flow
- Setiap request ke `/products/*` akan melewati middleware `auth`
- Middleware cek cookie token
- Jika token valid → Lanjut ke route handler
- Jika token tidak ada/invalid → Redirect ke login

### 3. CRUD Flow
- **READ**: GET `/products` → Query semua data → Render dashboard.ejs
- **CREATE**: GET `/products/add` → Render form → POST `/products/add` → Insert ke DB → Redirect
- **UPDATE**: GET `/products/edit/:id` → Query data by ID → Render form → POST `/products/edit/:id` → Update DB → Redirect
- **DELETE**: GET `/products/delete/:id` → Delete dari DB → Redirect

## Troubleshooting

### Error: Cannot connect to MySQL
- Pastikan MySQL service sudah running
- Cek username, password, dan nama database di `config/db.js`
- Pastikan database `inventory_db` sudah dibuat

### Error: User tidak ditemukan
- Pastikan sudah insert user ke tabel users
- Jalankan script `createUser.js` untuk membuat user

### Error: Port 3000 already in use
- Ganti port di `app.js`: `app.listen(3001, ...)`

## Catatan Keamanan
- Secret key JWT (`secret123`) sebaiknya disimpan di environment variable
- Jangan commit file `.env` ke repository
- Gunakan HTTPS di production
- Implementasi rate limiting untuk login

## Lisensi
ISC
