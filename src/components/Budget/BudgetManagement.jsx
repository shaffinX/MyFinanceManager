import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import './BudgetManagement.css';
import { AddBudget,GetBudgets,getExpenses,deleteBudget, updateBudget } from './BudgetHandler';
import Chart from './Chart';
/* eslint-disable react-hooks/exhaustive-deps */


const BudgetManagement = () => {
  const [budgetType, setBudgetType] = useState('month');
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [period, setPeriod] = useState('month');
  
  // New state for edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [editBudget, setEditBudget] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editAmount, setEditAmount] = useState(0);
  const [editPeriod, setEditPeriod] = useState('month');
  const [editID, setEditID] = useState('');

  const handleDeleteBudget = (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudget(id)
        .then((response) => {
          if (response) {
            alert('Budget deleted successfully');
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error('Error deleting budget:', error);
        });
    }
  }
  
  // New function to open edit modal
  const openEditModal = (budget) => {
    setEditBudget(budget);
    setEditCategory(budget.category);
    setEditAmount(budget.amount);
    setEditPeriod(budget.period);
    setIsEditModalOpen(true);
    setEditID(budget._id);
  }
  
  // New function to close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditBudget(null);
  }
  
  // New function to handle edit budget (left empty as requested)
  const handleEditBudget = async(e) => {
    e.preventDefault();
    if (editCategory && editAmount && editPeriod) {
      const response = await updateBudget(editID, editCategory, editAmount, editPeriod);
      if (response) {
        alert('Budget updated successfully');
        window.location.reload();
      } else {
        alert('Error updating budget');
      }
    } else {
      alert('Please fill all the fields');
    }
  }

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      if (response) {
        console.log(response);
        setExpenses(response);
      } else {
        alert('No expenses found');
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }

  const fetchBudgets = async () => {
    try {
      const response = await GetBudgets();
      if (response) {
        console.log(response);
        setBudgets(response);
      } else {
        alert('No budgets found');
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  }
  useEffect(() => {
     fetchBudgets();
     fetchExpenses();
     console.log(budgets);
     console.log("-----------");
     
     console.log(expenses);
     
     
  }, []);
  // Animation references
  const animateBudgetBar = (index) => {
    
    anime({
      targets: `.budget-bar-fill-${index}`,
      width: ['0%', '100%'],
      easing: 'easeInOutQuad',
      duration: 800,
      delay: index * 100
    });
  };

  React.useEffect(() => {
   
    budgets.forEach((_, index) => {
      animateBudgetBar(index);
    });
  }, [budgetType, budgets]);


  const handleAddBudget = (e) => {
    e.preventDefault();
    console.log("hhh");
    
    if(category&&amount&&period){
      AddBudget(category, amount, period)
        .then((response) => {
          if (response) {
            alert('Budget added successfully');
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error('Error adding budget:', error);
        });
    }
    else{
      alert('Please fill all the fields');
    }
  }

  return (
    <div className="budget-management-container">
      <motion.div 
        className="budget-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Budget Management</h1>
        <p>Set and track your budgets to keep your finances on track</p>
      </motion.div>

      <div className="budget-period-selector">
        <button 
          className={budgetType === 'day' ? 'active' : ''} 
          onClick={() => setBudgetType('day')}
        >
          Daily
        </button>
        <button 
          className={budgetType === 'week' ? 'active' : ''} 
          onClick={() => setBudgetType('week')}
        >
          Weekly
        </button>
        <button 
          className={budgetType === 'month' ? 'active' : ''} 
          onClick={() => setBudgetType('month')}
        >
          Monthly
        </button>
      </div>

      <motion.div 
        className="budget-form-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Add New Budget</h2>
        <form className="budget-form" onSubmit={handleAddBudget}>
          <div className="form-group">
            <label>Category</label>
            <select
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="food">Food</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                  <option value="housing">Housing</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="number" placeholder="Enter amount" onChange={(e)=>{setAmount(e.target.value)}} value={amount}/>
          </div>
          <div className="form-group">
            <label>Period</label>
            <select onChange={(e) => setPeriod(e.target.value)} value={period}>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>
          <button type="submit" className="add-budget-btn">Add Budget</button>
        </form>
      </motion.div>

      <motion.div 
        className="budget-list-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2>Your {budgetType === 'day' ? 'Daily' : budgetType === 'week' ? 'Weekly' : 'Monthly'} Budgets</h2>
        
        <div className="budget-list">
          {budgets
            .filter(budget => budget.period === budgetType)
            .map((budget, index) => (
              <motion.div 
                key={budget.id} 
                className="budget-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="budget-item-header">
                  <h3>{budget.category}</h3>
                  <div className="budget-actions">
                    <button className="edit-btn" onClick={() => openEditModal(budget)}>Edit</button>
                    <button className="delete-btn" onClick={()=>{handleDeleteBudget(budget._id)}}>Delete</button>
                  </div>
                </div>
                <div className="budget-amount">Rs.{budget.amount.toLocaleString()}</div>
                <div className="budget-progress">
                  <div className="budget-bar">
                    <div className={`budget-bar-fill budget-bar-fill-${index}`} style={{ width: '0%' }}></div>
                  </div>
                  <div className="budget-progress-text">
                    <span>₹0</span>
                    <span>₹{budget.amount.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      <motion.div 
        className="budget-comparison"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
       <Chart budget={budgets} expenses={expenses} />
      </motion.div>
      
      {/* Edit Budget Modal */}
      {isEditModalOpen && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <h2>Edit Budget</h2>
              <button className="close-modal-btn" onClick={closeEditModal}>×</button>
            </div>
            <form className="edit-budget-form" onSubmit={handleEditBudget}>
              <div className="form-group">
                <label>Category</label>
                <select
                  id="edit-category"
                  required
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  <option value="food">Food</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                  <option value="housing">Housing</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input 
                  type="number" 
                  placeholder="Enter amount" 
                  onChange={(e) => setEditAmount(e.target.value)} 
                  value={editAmount}
                  required
                />
              </div>
              <div className="form-group">
                <label>Period</label>
                <select 
                  onChange={(e) => setEditPeriod(e.target.value)} 
                  value={editPeriod}
                  required
                >
                  <option value="day">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                </select>
              </div>
              <div className="edit-modal-actions">
                <button type="button" className="cancel-btn" onClick={closeEditModal}>Cancel</button>
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetManagement;