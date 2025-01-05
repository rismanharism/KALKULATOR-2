const db = require('../config/db');

const saveHistory = (operation, result, callback) => {
  const query = 'INSERT INTO history (operation, result) VALUES (?, ?)';
  db.query(query, [operation, result], callback);
};

const getHistory = (callback) => {
  const query = 'SELECT * FROM history ORDER BY id DESC';
  db.query(query, callback);
};

// Fungsi untuk menghapus semua riwayat kalkulasi
const clearHistoryFromDb = (callback) => {
  const query = 'DELETE FROM history';
  db.query(query, callback);
};

// Fungsi untuk menghapus riwayat kalkulasi berdasarkan ID
const deleteHistoryFromDb  = (id, callback) => {
  const query = 'DELETE FROM history WHERE id = ?';
  db.query(query, [id], callback);
};

module.exports = { saveHistory, getHistory, clearHistoryFromDb, deleteHistoryFromDb };
