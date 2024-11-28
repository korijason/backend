// backend/routes/budgetRoutes.js
const express = require("express");
const Budget = require("../models/budget");

const router = express.Router();

// Create a new budget entry
router.post("/", async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
