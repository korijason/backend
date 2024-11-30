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

// Delete a budget entry
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return res.status(404).json({ error: "Budget not found." });
    }
    res.status(200).json({ message: "Budget deleted successfully." });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a budget entry
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, amount } = req.body;

    if (!name || !description || !amount) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const updatedBudget = await Budget.findByIdAndUpdate(
      id,
      { name, description, amount },
      { new: true } // Return the updated document
    );

    if (!updatedBudget) {
      return res.status(404).json({ error: "Budget not found." });
    }

    res.status(200).json(updatedBudget);
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
