// backend/models/budget.js
const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  page: { type: String, required: true },
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
