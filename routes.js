import express from 'express';
import {Login,Register,checkMe} from './Controller/authController.js';
import {SendProfileData,SavePersonalData, ChangePassword} from './Controller/profileController.js';
import {AddExpense,GetExpenses,DeleteExpense,getExpenseById,updateExpense} from './Controller/expenseController.js';
import { AddBudget,GetBudgets,DeleteBudget,UpdateBudget } from './Controller/budgetController.js';
import {addSavings,getSavings} from './Controller/savingController.js';
import errorHandler from './Middleware/errorMiddleware.js';
import verifyToken from './Middleware/verifyToken.js';
const router = express.Router();
router.use('/api',verifyToken);
router.use('/',errorHandler);
router.post('/login',Login);
router.post('/register',Register);
router.post('/checkme',checkMe);
router.post('/api/getProfile',SendProfileData);
router.post('/api/saveProfile',SavePersonalData);
router.post('/api/changePassword',ChangePassword)
router.post('/api/AddExpense',AddExpense);
router.post('/api/getExpense',GetExpenses);
router.get('/api/getExpense/:id',getExpenseById);
router.delete('/api/delExpense/:id',DeleteExpense);
router.put('/api/updateExpense/:id',updateExpense);
router.post('/api/addBudget',AddBudget);
router.post('/api/getBudget',GetBudgets);
router.delete('/api/delBudget/:id',DeleteBudget);
router.put('/api/updateBudget/:id',UpdateBudget);
router.post('/api/addSavings',addSavings);
router.post('/api/getSavings',getSavings);

router.get('/', (req, res) => {
    res.send('API is running...');
})
export default router;