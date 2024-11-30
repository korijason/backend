const express = require("express");
const Expense = require("../models/expense");
const router = express.Router();

// POST new expense
router.post("/", async (req, res) => {
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
    res.status(500).json({ message: "Error adding expense" });
  }
});

// GET all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) an expense by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, type, amount, date } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { name, type, amount, date },
      { new: true } // Return the updated document
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
});

// DELETE an expense by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
});

module.exports = router;
