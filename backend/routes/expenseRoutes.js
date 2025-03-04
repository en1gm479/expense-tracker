const express = require('express');
const { addExpense, getExpenses, getTotalExpenses } = require('../controllers/expenseController');

const router = express.Router();

router.post('/expenses', addExpense);
router.get('/expenses', getExpenses);
router.get('/expenses/total', getTotalExpenses);

module.exports = router;
