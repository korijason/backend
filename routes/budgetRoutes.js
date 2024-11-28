// backend/routes/budgetRoutes.js
const express = require("express");
const Budget = require("../models/budget");

const router = express.Router();

// Create a new budget entry
router.post('/', async (req, res) => { // This will handle POST to /api/budget
  try {
    const { name, description, amount } = req.body;
    if (!name || !description || !amount) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newBudget = new Budget({ name, description, amount });
    const savedBudget = await newBudget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    console.error('Error adding budget:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all budget entries
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
