const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    try {
        const { amount, category, date, description } = req.body;
        const newExpense = new Expense({ amount, category, date, description });
        await newExpense.save();
        res.status(201).json({status:true, msg:`Your exprense data is saved successfully!`, newExpense});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        let query = {};
        if (req.query.category) query.category = req.query.category;
        if (req.query.date) query.date = req.query.date;

        const expenses = await Expense.find(query);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTotalExpenses = async (req, res) => {
    try {
        const { start, end } = req.query;
        const expenses = await Expense.find({
            date: { $gte: new Date(start), $lte: new Date(end) }
        });

        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        res.json({ total });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
