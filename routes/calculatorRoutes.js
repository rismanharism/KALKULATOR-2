const express = require('express');
const { calculate, getCalculationHistory, clearHistory, deleteHistoryById  } = require('../controllers/calculatorController');
const router = express.Router();

// Halaman utama
router.get('/', (req, res) => {
  res.render('index', { result: undefined, history: [] });
});

router.post('/calculate', calculate);
router.get('/history', getCalculationHistory);
router.post('/clear-history', clearHistory);  // Menambahkan rute untuk menghapus riwayat
router.post('/delete-history/:id', deleteHistoryById);  // Menambahkan rute untuk menghapus riwayat per ID

module.exports = router;
