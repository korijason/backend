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

// PUT (update) an income entry by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, amount, date, source } = req.body;

  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      id,
      { name, amount, date, source },
      { new: true } // Return the updated document
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({ message: "Error updating income", error });
  }
});

// DELETE an income entry by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting income", error });
  }
});

module.exports = router;
