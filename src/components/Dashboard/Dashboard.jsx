// pages/Dashboard.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiDollarSign, FiCreditCard, FiPieChart, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import anime from 'animejs/lib/anime.es.js';
import './Dashboard.css';

const Dashboard = () => {
  const cardRefs = useRef([]);
  const chartRef = useRef(null);

  useEffect(() => {
    // Animate cards
    anime({
      targets: cardRefs.current,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      duration: 800
    });

    // Animate chart bars
    anime({
      targets: '.chart-bar .bar',
      scaleY: [0, 1],
      delay: anime.stagger(60, {start: 600}),
      easing: 'easeOutExpo',
      duration: 800
    });

    // Animate expense categories
    anime({
      targets: '.expense-category',
      translateX: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(50, {start: 1000}),
      easing: 'easeOutExpo',
      duration: 600
    });
  }, []);

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  // Sample data
  const expenseCategories = [
    { name: 'Housing', percentage: 35, amount: 700, color: '#6C63FF' },
    { name: 'Food', percentage: 20, amount: 400, color: '#FF6584' },
    { name: 'Transportation', percentage: 15, amount: 300, color: '#FFC107' },
    { name: 'Entertainment', percentage: 10, amount: 200, color: '#4CAF50' },
    { name: 'Utilities', percentage: 10, amount: 200, color: '#2196F3' },
    { name: 'Others', percentage: 10, amount: 200, color: '#9C27B0' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="/expenses/add" className="btn btn-primary">
          <FiPlus /> Add Expense
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card" ref={addToCardRefs}>
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <div className="stat-info">
            <h3>Total Balance</h3>
            <p className="stat-value">$2,450</p>
            <p className="stat-trend positive">
              <FiTrendingUp /> 8.2% from last month
            </p>
          </div>
        </div>

        <div className="stat-card" ref={addToCardRefs}>
          <div className="stat-icon">
            <FiCreditCard />
          </div>
          <div className="stat-info">
            <h3>Total Expenses</h3>
            <p className="stat-value">$1,850</p>
            <p className="stat-trend negative">
              <FiTrendingDown /> 2.5% from last month
            </p>
          </div>
        </div>

        <div className="stat-card" ref={addToCardRefs}>
          <div className="stat-icon">
            <FiPieChart />
          </div>
          <div className="stat-info">
            <h3>Total Savings</h3>
            <p className="stat-value">$600</p>
            <p className="stat-trend positive">
              <FiTrendingUp /> 12.3% from last month
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-column">
          <div className="dashboard-card" ref={addToCardRefs}>
            <div className="card-header">
              <h2>Monthly Expenses</h2>
              <select>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="chart" ref={chartRef}>
              <div className="chart-container">
                <div className="chart-bar">
                  <div className="bar" style={{ height: '40%' }}></div>
                  <div className="bar-label">Jan</div>
                </div>
                <div className="chart-bar">
                  <div className="bar" style={{ height: '65%' }}></div>
                  <div className="bar-label">Feb</div>
                </div>
                <div className="chart-bar">
                  <div className="bar" style={{ height: '45%' }}></div>
                  <div className="bar-label">Mar</div>
                </div>
                <div className="chart-bar">
                  <div className="bar" style={{ height: '70%' }}></div>
                  <div className="bar-label">Apr</div>
                </div>
                <div className="chart-bar">
                  <div className="bar" style={{ height: '55%' }}></div>
                  <div className="bar-label">May</div>
                </div>
                <div className="chart-bar">
                  <div className="bar" style={{ height: '80%' }}></div>
                  <div className="bar-label">Jun</div>
                </div>
                <div className="chart-bar">
                  <div className="bar" style={{ height: '75%' }}></div>
                  <div className="bar-label">Jul</div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card" ref={addToCardRefs}>
            <div className="card-header">
              <h2>Recent Transactions</h2>
              <Link to="/expenses" className="view-all">View All</Link>
            </div>
            <div className="transactions">
              <div className="transaction-item">
                <div className="transaction-icon grocery">
                  <FiShoppingCart />
                </div>
                <div className="transaction-details">
                  <div className="transaction-title">Grocery Shopping</div>
                  <div className="transaction-date">Today, 2:30 PM</div>
                </div>
                <div className="transaction-amount expense">-$85.20</div>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon utilities">
                  <FiZap />
                </div>
                <div className="transaction-details">
                  <div className="transaction-title">Electricity Bill</div>
                  <div className="transaction-date">Yesterday, 11:15 AM</div>
                </div>
                <div className="transaction-amount expense">-$120.00</div>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon income">
                  <FiDollarSign />
                </div>
                <div className="transaction-details">
                  <div className="transaction-title">Salary Deposit</div>
                  <div className="transaction-date">May 01, 9:00 AM</div>
                </div>
                <div className="transaction-amount income">+$2,850.00</div>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon entertainment">
                  <FiFilm />
                </div>
                <div className="transaction-details">
                  <div className="transaction-title">Movie Tickets</div>
                  <div className="transaction-date">Apr 28, 7:30 PM</div>
                </div>
                <div className="transaction-amount expense">-$24.50</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-column">
          <div className="dashboard-card" ref={addToCardRefs}>
            <div className="card-header">
              <h2>Expense Breakdown</h2>
              <select>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="expenses-breakdown">
              {expenseCategories.map((category, index) => (
                <div key={index} className="expense-category">
                  <div className="expense-info">
                    <div className="color-indicator" style={{ backgroundColor: category.color }}></div>
                    <div className="expense-name">{category.name}</div>
                    <div className="expense-percentage">{category.percentage}%</div>
                    <div className="expense-amount">${category.amount}</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${category.percentage}%`, backgroundColor: category.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card" ref={addToCardRefs}>
            <div className="card-header">
              <h2>Budget vs. Spent</h2>
              <div className="badge">This Month</div>
            </div>
            <div className="budget-comparison">
              <div className="budget-item">
                <div className="budget-info">
                  <div className="budget-title">Housing</div>
                  <div className="budget-values">
                    <span className="spent">$700</span> / <span className="budget">$800</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '87.5%' }}></div>
                </div>
              </div>
              <div className="budget-item">
                <div className="budget-info">
                  <div className="budget-title">Food</div>
                  <div className="budget-values">
                    <span className="spent">$400</span> / <span className="budget">$500</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="budget-item">
                <div className="budget-info">
                  <div className="budget-title">Transportation</div>
                  <div className="budget-values">
                    <span className="spent">$300</span> / <span className="budget">$300</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="budget-item">
                <div className="budget-info">
                  <div className="budget-title">Entertainment</div>
                  <div className="budget-values">
                    <span className="spent">$200</span> / <span className="budget">$150</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress progress-exceeded" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card tips-card" ref={addToCardRefs}>
            <div className="card-header">
              <h2>Savings Tips</h2>
            </div>
            <div className="tips-content">
              <p>Based on your spending patterns, here are some tips to help you save more:</p>
              <ul className="tips-list">
                <li>Your entertainment expenses have exceeded your budget by 33%. Consider reducing subscriptions.</li>
                <li>You've saved 12.5% on housing expenses this month. Great job!</li>
                <li>Food expenses are within budget. Keep it up!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import the icons here
const FiShoppingCart = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
const FiZap = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const FiFilm = (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>;

export default Dashboard;