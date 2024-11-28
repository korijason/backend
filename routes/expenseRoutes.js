// backend/routes/expenseRoutes.js
const express = require("express");
const Expense = require("../models/expense");

const router = express.Router();

// Create a new expense entry
router.post('/expenses', async (req, res) => {
  try {
    const { name, type, amount, date } = req.body;
    const newExpense = new Expense({
      name,
      type,
      amount,
      date,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense' });
  }
});




// Get all expense entries
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
