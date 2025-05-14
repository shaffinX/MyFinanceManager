import React, { useState } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import './BudgetManagement.css';

const BudgetManagement = () => {
  const [budgetType, setBudgetType] = useState('month');
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food', amount: 5000, period: 'month' },
    { id: 2, category: 'Transportation', amount: 2000, period: 'month' },
    { id: 3, category: 'Entertainment', amount: 1500, period: 'month' },
    { id: 4, category: 'Utilities', amount: 3000, period: 'month' },
  ]);

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
        <form className="budget-form">
          <div className="form-group">
            <label>Category</label>
            <input type="text" placeholder="e.g., Food, Transportation" />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input type="number" placeholder="Enter amount" />
          </div>
          <div className="form-group">
            <label>Period</label>
            <select>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>
          <button type="button" className="add-budget-btn">Add Budget</button>
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
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
                <div className="budget-amount">₹{budget.amount.toLocaleString()}</div>
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
        <h2>Budget vs. Expenses</h2>
        <div className="comparison-chart">
          {/* Chart will be populated with actual data */}
          <div className="chart-placeholder">
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color budget-color"></div>
                <span>Budget</span>
              </div>
              <div className="legend-item">
                <div className="legend-color expense-color"></div>
                <span>Expense</span>
              </div>
            </div>
            <div className="chart-bars">
              {['Food', 'Transportation', 'Entertainment', 'Utilities'].map((category, index) => (
                <div key={category} className="chart-bar-group">
                  <div className="chart-label">{category}</div>
                  <div className="chart-bar-container">
                    <div className={`chart-bar budget-bar-graph budget-bar-${index}`}></div>
                    <div className={`chart-bar expense-bar-graph expense-bar-${index}`} style={{height: `${30 + Math.random() * 50}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BudgetManagement;