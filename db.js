const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Paddu@123456',
  database: 'brand_system'
});

db.connect((err) => {
  if (err) {
    console.log('DB Error:', err);
  } else {
    console.log('MySQL Connected...');
  }
});

module.exports = db;   // 👈 VERY IMPORTANT