// backend/models/income.js
const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
