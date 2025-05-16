import mongoose from "./connect.js";
const BudgetSchema = new mongoose.Schema({
    category:String,
    amount:Number,
    period:String,
    email:String,
});
const Budget = mongoose.model('Budget', BudgetSchema);
export default Budget;