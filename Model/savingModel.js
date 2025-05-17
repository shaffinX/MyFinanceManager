import mongoose from "./connect.js";
const SavingSchema = new mongoose.Schema({
    savings: Number,
    month: String,
    email: String,
});
const Saving = mongoose.model('Saving', SavingSchema);
export default Saving;