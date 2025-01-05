const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');

  // Create database and table
  connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) throw err;
    console.log(`Database ${process.env.DB_NAME} created or exists already`);

    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) throw err;

      connection.query(`
        CREATE TABLE IF NOT EXISTS history (
          id INT AUTO_INCREMENT PRIMARY KEY,
          operation VARCHAR(255) NOT NULL,
          result FLOAT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) throw err;
        console.log('Table "history" ready');
      });
    });
  });
});

module.exports = connection;
