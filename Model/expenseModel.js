import mongoose from './connect.js';
const ExpenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: String,
  receipt: Boolean,
  email: String
});
const Expense = mongoose.model('Expense', ExpenseSchema);
export default Expense;