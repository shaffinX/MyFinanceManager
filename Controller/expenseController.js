import Expense from "../Model/expenseModel.js";
export const AddExpense = async (req, res) => {
    let { title, amount, date, category,email,receipt } = req.body;
    console.log(req.body);
    amount = parseFloat(amount);
    
    try {
        const newExpense = new Expense({
            title:title,
            amount:amount,
            category:category,
            date:date,
            receipt:receipt,
            email:email
        });
        await newExpense.save();
        res.status(200).json({ message: 'Expense added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
}

export const GetExpenses = async (req, res) => {
    const { email } = req.body;
    try {
        const expenses = await Expense.find({ email: email });
        if (expenses.length > 0) {
            res.status(200).json(expenses);
        } else {
            res.status(404).json({ message: 'No expenses found' });
        }

    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
}

export const DeleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (deletedExpense) {
            res.status(200).json({ message: 'Expense deleted successfully' });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error });
    }
}
export const getExpenseById = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findById(id);
        if (expense) {
            res.status(200).json(expense);
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expense', error });
    }
}

export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, date, category } = req.body;
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, {
            title: title,
            amount: amount,
            category: category,
            date: date
        }, { new: true });
        if (updatedExpense) {
            res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense', error });
    }
}