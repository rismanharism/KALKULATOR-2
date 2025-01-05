const { saveHistory, getHistory, clearHistoryFromDb, deleteHistoryFromDb  } = require('../models/historyModel');

const calculate = (req, res) => {
  const { num1, num2, operation } = req.body;

  // Validasi input
  if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
    return res.render('index', { 
      result: undefined, 
      error: 'Input harus berupa angka!', 
      history: [] 
    });
  }

  if (!['+', '-', '*', '/'].includes(operation)) {
    return res.render('index', { 
      result: undefined, 
      error: 'Operasi tidak valid!', 
      history: [] 
    });
  }

  if (operation === 'bagi' && parseFloat(num2) === 0) {
    return res.render('index', { 
      result: undefined, 
      error: 'Tidak dapat membagi dengan nol!', 
      history: [] 
    });
  }

  let result;
  switch (operation) {
    case '+':
      result = parseFloat(num1) + parseFloat(num2);
      break;
    case '-':
      result = parseFloat(num1) - parseFloat(num2);
      break;
    case '*':
      result = parseFloat(num1) * parseFloat(num2);
      break;
    case '/':
      result = parseFloat(num1) / parseFloat(num2);
      break;
  }

  const operationString = `${num1} ${operation} ${num2} = ${result}`;
  saveHistory(operationString, result, (err) => {
    if (err) throw err;
    res.render('index', { result, error: undefined, history: [] });
  });
};

const getCalculationHistory = (req, res) => {
  getHistory((err, results) => {
    if (err) throw err;
    res.render('history', { history: results });
  });
};

// Fungsi untuk menghapus riwayat kalkulasi
const clearHistory = (req, res) => {
  clearHistoryFromDb((err) => {
    if (err) throw err;
    res.redirect('/history');  // Setelah riwayat dihapus, redirect ke halaman riwayat
  });
};

// Fungsi untuk menghapus riwayat kalkulasi berdasarkan ID
const deleteHistoryById = (req, res) => {
  const { id } = req.params;

  deleteHistoryFromDb(id, (err) => {
    if (err) throw err;
    res.redirect('/history');  // Redirect ke halaman riwayat setelah menghapus
  });
};

module.exports = { calculate, getCalculationHistory, clearHistory, deleteHistoryById };
