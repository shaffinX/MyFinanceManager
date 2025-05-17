import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import './SavingsCalculation.css';
import SavingsIntelligence from './SavingsIntelligence';
import { getExpenses, GetBudgets, addSavingsMonth, getSavingsYear } from './SavingsHandler';
import { SBE } from '../../SBE';
import SavingsTrendNotification from './SavingsTrendNotification';
/* eslint-disable react-hooks/exhaustive-deps */

const SavingsCalculation = () => {
  const savingsGraphRef = useRef(null);

  const { setSBE} = React.useContext(SBE);

  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [savingsTrend, setSavingsTrend] = useState({ percentage: 0, isPositive: true });
  const [yearlySavings, setYearlySavings] = useState([]);

  // Update the fetchData function to properly process the savings data
  const fetchData = async () => {
    const budgets = await GetBudgets();
    const expenses = await getExpenses();

    // Get savings data for the year
    let savingsData = await getSavingsYear();
    
    // Transform the data from array of objects to an ordered array of values
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const processedSavings = monthNames.map(monthName => {
      // Find the corresponding month in the data
      const monthData = savingsData.find(item => item.month === monthName);
      return monthData ? monthData.savings : 0; // Return savings or 0 if not found
    });
    
    setYearlySavings(processedSavings);
    
    // Calculate monthly totals
    calculateMonthlySummary(budgets, expenses, processedSavings);
  };

  const calculateMonthlySummary = (budgets, expenses, savingsData) => {
    // Calculate total monthly budget from all categories
    const totalBudget = budgets.reduce((total, budget) => {
      let monthlyAmount = budget.amount; // Default for monthly budgets
      
      // Convert other period budgets to monthly
      if (budget.period === 'week') {
        monthlyAmount = budget.amount * 4; // Weekly budget to monthly
      } else if (budget.period === 'day') {
        monthlyAmount = budget.amount * 30; // Daily budget to monthly
      }
      
      return total + monthlyAmount;
    }, 0);
    
    // Calculate total monthly expenses from all categories
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const totalExpenses = expenses.reduce((total, expense) => {
      const expenseDate = new Date(expense.date);
      // Only count expenses from the current month
      if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
        return total + expense.amount;
      }
      return total;
    }, 0);
    
    // Calculate monthly savings
    const savings = totalBudget - totalExpenses;
    
    setMonthlyBudget(totalBudget);
    setMonthlyExpenses(totalExpenses);
    setMonthlySavings(savings);
    
    setSBE({
      tb: totalBudget,
      te: totalExpenses,
      s: savings
    });
    // Add current month's savings to SavingsHandler
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const currentMonthShort = monthNames[currentMonth];
    addSavingsMonth(savings, currentMonthShort);
    
    // Calculate savings trend compared to last month
    if (savingsData && savingsData.length > 0) {
      // Get previous month's index
      let prevMonthIndex = currentMonth - 1;
      if (prevMonthIndex < 0) prevMonthIndex = 11; // December of previous year
      
      const prevMonthSavings = savingsData[prevMonthIndex] || 0;
      
      if (prevMonthSavings !== 0) {
        const percentageChange = ((savings - prevMonthSavings) / Math.abs(prevMonthSavings)) * 100;
        setSavingsTrend({
          percentage: Math.abs(Math.round(percentageChange * 10) / 10),
          isPositive: percentageChange >= 0
        });
      }
    }
  }

  // Animation for savings graph
  useEffect(() => {
    fetchData();
  }, []);

  // Animation for the charts
  // Animation for the charts
  useEffect(() => {
    if (savingsGraphRef.current && yearlySavings.length > 0) {
      // Only include months with data for the trend line
      const nonZeroIndices = yearlySavings.map((value, index) => ({ value, index }))
        .filter(item => item.value > 0);
      
      if (nonZeroIndices.length > 0) {
        const maxSavings = Math.max(...yearlySavings, 1);
        const graphWidth = savingsGraphRef.current.querySelector('.graph-content').clientWidth;
        const barWidth = graphWidth / 12;
        
        // Generate points for trend line based on non-zero data
        const points = nonZeroIndices.map(item => {
          const x = (item.index * barWidth) + (barWidth / 2);
          const y = 100 - ((item.value / maxSavings) * 100);
          return `${x},${y}`;
        }).join(' ');

        // Update the points attribute for the polyline
        const trendLine = document.querySelector('.savings-trend-line');
        if (trendLine) {
          trendLine.setAttribute('points', points);
          
          anime({
            targets: '.savings-trend-line',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
            delay: 200
          });
        }
      }
    }
  }, [yearlySavings]);

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get month names for display
 const getMonthNames = () => {
  // Use the same order as our data processing - start with January
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
};

  return (
    <React.Fragment>
      <SavingsTrendNotification savingsTrend={savingsTrend} />
      <div className="savings-container">
        <motion.div
          className="savings-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Savings Tracker</h1>
          <p>Monitor your savings progress and identify trends</p>
        </motion.div>

        <div className="savings-dashboard">
          <motion.div
            className="savings-summary-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="summary-item">
              <h3>Current Savings</h3>
              <div className="amount-container">
                <span className="amount">{formatCurrency(monthlySavings)}</span>
              </div>
            </div>
            <div className="summary-item">
              <h3>Monthly Budget</h3>
              <div className="amount-container">
                <span className="amount">{formatCurrency(monthlyBudget)}</span>
              </div>
            </div>
            <div className="summary-item">
              <h3>Monthly Expenses</h3>
              <div className="amount-container">
                <span className="amount">{formatCurrency(monthlyExpenses)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="savings-graph-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            ref={savingsGraphRef}
          >
            <h2>Savings Over Time</h2>
            <div className="savings-graph">
              <div className="graph-y-axis">
                {[100, 75, 50, 25, 0].map((percent) => (
                  <span key={percent}>{formatCurrency(Math.max(...yearlySavings, 1) * percent / 100)}</span>
                ))}
              </div>
              <div className="graph-content">
                {getMonthNames().map((month, index) => (
                  <div key={month} className="savings-bar-container">
                    <div 
                      className="savings-bar"
                      style={{ height: `${yearlySavings[index] ? (yearlySavings[index] / Math.max(...yearlySavings, 1)) * 100 : 0}%` }}
                    ></div>
                    <span className="month-label">{month}</span>
                  </div>
                ))}
                <svg className="trend-line-svg" width="100%" height="100%">
                  <polyline
                    className="savings-trend-line"
                    points=""
                    fill="none"
                    stroke="#4a6cf7"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="savings-insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2>Savings Insights</h2>
            <div className="insights-content">
              <div className={`insight-card ${savingsTrend.isPositive ? 'positive' : 'negative'}`}>
                <div className="insight-icon">{savingsTrend.isPositive ? '↑' : '↓'}</div>
                <div className="insight-text">
                  <h3>{savingsTrend.isPositive ? 'Positive Trend' : 'Negative Trend'}</h3>
                  <p>Your savings have {savingsTrend.isPositive ? 'increased' : 'decreased'} by {savingsTrend.percentage}% compared to last month.</p>
                </div>
              </div>
              <div className="insight-card warning">
                <div className="insight-icon">!</div>
                <div className="insight-text">
                  <h3>Budget Utilization</h3>
                  <p>You've used {Math.round((monthlyExpenses / monthlyBudget) * 100)}% of your monthly budget.</p>
                </div>
              </div>
              <div className="insight-card tip">
                <div className="insight-icon">💡</div>
                <div className="insight-text">
                  <h3>Savings Tip</h3>
                  <p>{monthlySavings >= 0 ? 
                    `Great job! You're on track to save ${formatCurrency(monthlySavings * 12)} this year.` : 
                    `Consider reviewing your budget to avoid a monthly deficit of ${formatCurrency(Math.abs(monthlySavings))}.`}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <SavingsIntelligence yearlySavings={yearlySavings} monthlySavings={monthlySavings}/>
    </React.Fragment>
  );
};

export default SavingsCalculation;