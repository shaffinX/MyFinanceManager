import Budget from "../Model/budgetModel.js";
export const AddBudget = async (req, res) => {
    const { category, amount, period, email } = req.body;
    try {
        const newBudget = new Budget({
            category: category,
            amount: amount,
            period: period,
            email: email
        });
        await newBudget.save();
        res.status(200).json({ message: 'Budget added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding budget', error });
    }
}

export const GetBudgets = async (req, res) => {
    const { email } = req.body;
    try {
        const budgets = await Budget.find({ email: email });
        if (budgets.length > 0) {
            res.status(200).json(budgets);
        } else {
            res.status(404).json({ message: 'No budgets found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budgets', error });
    }
}

export const DeleteBudget = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBudget = await Budget.findByIdAndDelete(id);
        if (deletedBudget) {
            res.status(200).json({ message: 'Budget deleted successfully' });
        } else {
            res.status(404).json({ message: 'Budget not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting budget', error });
    }
}

export const UpdateBudget = async (req, res) => {
    const { id } = req.params;
    const { category, amount, period } = req.body;
    try {
        const updatedBudget = await Budget.findByIdAndUpdate(id, {
            category: category,
            amount: amount,
            period: period
        }, { new: true });
        if (updatedBudget) {
            res.status(200).json(updatedBudget);
        } else {
            res.status(404).json({ message: 'Budget not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating budget', error });
    }
}