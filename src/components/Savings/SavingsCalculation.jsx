import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import './SavingsCalculation.css';

const SavingsCalculation = () => {
  const savingsGraphRef = useRef(null);
  const categoryChartRef = useRef(null);

  // Mock data
  const savingsData = [
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 7500 },
    { month: 'Mar', amount: 6800 },
    { month: 'Apr', amount: 8200 },
    { month: 'May', amount: 7000 },
    { month: 'Jun', amount: 9500 },
  ];

  const expenseCategories = [
    { category: 'Food', percentage: 30, trend: 'increase' },
    { category: 'Rent', percentage: 40, trend: 'stable' },
    { category: 'Shopping', percentage: 15, trend: 'decrease' },
    { category: 'Entertainment', percentage: 10, trend: 'increase' },
    { category: 'Others', percentage: 5, trend: 'stable' },
  ];

  // Animation for savings graph
  useEffect(() => {
    if (savingsGraphRef.current) {
      anime({
        targets: '.savings-bar',
        height: (el, i) => {
          return `${(savingsData[i].amount / 10000) * 100}%`;
        },
        delay: anime.stagger(100),
        duration: 1000,
        easing: 'easeInOutQuad'
      });

      anime({
        targets: '.savings-trend-line',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: 1000
      });
    }
  }, []);

  // Animation for category chart
  useEffect(() => {
    if (categoryChartRef.current) {
      anime({
        targets: '.category-bar',
        width: (el, i) => {
          return `${expenseCategories[i].percentage * 2}%`;
        },
        delay: anime.stagger(100),
        duration: 1000,
        easing: 'easeInOutQuad'
      });
    }
  }, []);

  return (
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
              <span className="amount">₹9,500</span>
              <span className="trend positive">+12.5% ↑</span>
            </div>
          </div>
          <div className="summary-item">
            <h3>Monthly Budget</h3>
            <div className="amount-container">
              <span className="amount">₹15,000</span>
            </div>
          </div>
          <div className="summary-item">
            <h3>Monthly Expenses</h3>
            <div className="amount-container">
              <span className="amount">₹5,500</span>
              <span className="trend negative">+3.2% ↑</span>
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
              <span>₹10,000</span>
              <span>₹7,500</span>
              <span>₹5,000</span>
              <span>₹2,500</span>
              <span>₹0</span>
            </div>
            <div className="graph-content">
              {savingsData.map((data, index) => (
                <div key={data.month} className="savings-bar-container">
                  <div className="savings-bar"></div>
                  <span className="month-label">{data.month}</span>
                </div>
              ))}
              <svg className="trend-line-svg" width="100%" height="100%">
                <polyline 
                  className="savings-trend-line"
                  points="30,70 90,45 150,52 210,38 270,48 330,25"
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
            <div className="insight-card positive">
              <div className="insight-icon">↑</div>
              <div className="insight-text">
                <h3>Positive Trend</h3>
                <p>Your savings have increased by 12.5% compared to last month.</p>
              </div>
            </div>
            <div className="insight-card warning">
              <div className="insight-icon">!</div>
              <div className="insight-text">
                <h3>Spending Alert</h3>
                <p>Food expenses have increased by 8% this month.</p>
              </div>
            </div>
            <div className="insight-card tip">
              <div className="insight-icon">💡</div>
              <div className="insight-text">
                <h3>Savings Tip</h3>
                <p>You could save an additional ₹1,200 by reducing entertainment expenses by 20%.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="expense-category-impact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          ref={categoryChartRef}
        >
          <h2>Expense Categories Impact</h2>
          <p>See which categories affect your savings the most</p>
          
          <div className="category-chart">
            {expenseCategories.map((category, index) => (
              <div key={category.category} className="category-item">
                <div className="category-info">
                  <span className="category-name">{category.category}</span>
                  <span className="category-percentage">{category.percentage}%</span>
                </div>
                <div className="category-bar-container">
                  <div className={`category-bar ${category.trend}`}></div>
                </div>
                <div className="category-trend">
                  {category.trend === 'increase' ? (
                    <span className="trend-icon negative">↑</span>
                  ) : category.trend === 'decrease' ? (
                    <span className="trend-icon positive">↓</span>
                  ) : (
                    <span className="trend-icon neutral">→</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="savings-goals"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2>Savings Goals</h2>
          <div className="goals-container">
            <div className="goal-card">
              <div className="goal-info">
                <h3>Emergency Fund</h3>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '65%' }}></div>
                  </div>
                  <span className="progress-text">65% Complete</span>
                </div>
                <div className="goal-amounts">
                  <span>₹65,000 / ₹100,000</span>
                </div>
              </div>
            </div>
            <div className="goal-card">
              <div className="goal-info">
                <h3>New Laptop</h3>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '40%' }}></div>
                  </div>
                  <span className="progress-text">40% Complete</span>
                </div>
                <div className="goal-amounts">
                  <span>₹30,000 / ₹75,000</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SavingsCalculation;