// backend/routes/incomeRoutes.js
const express = require("express");
const Income = require("../models/income");

const router = express.Router();

// Create a new income entry
router.post("/", async (req, res) => {
  try {
    const newIncome = new Income(req.body);
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all income entries
router.get("/", async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
