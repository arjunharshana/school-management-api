const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = process.env.DATABASE_URL
  ? {
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
  : {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

const pool = mysql.createPool(dbConfig);

// Test the database connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database!');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.message);
  });

module.exports = pool;
