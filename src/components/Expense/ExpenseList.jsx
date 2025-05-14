// pages/ExpenseList.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2, FiFilter, FiSearch, FiDownload, FiCalendar } from 'react-icons/fi';
import anime from 'animejs/lib/anime.es.js';
import './ExpenseList.css';

const ExpenseList = () => {
  const containerRef = useRef(null);
  const tableRowsRef = useRef([]);

  useEffect(() => {
    // Animate the container
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutExpo',
      duration: 600
    });

    // Animate table rows
    anime({
      targets: tableRowsRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(50, {start: 300}),
      easing: 'easeOutExpo',
      duration: 500
    });
  }, []);

  const addToTableRowsRef = (el) => {
    if (el && !tableRowsRef.current.includes(el)) {
      tableRowsRef.current.push(el);
    }
  };

  // Sample expense data
  const expenses = [
    { id: 1, title: 'Grocery Shopping', amount: 85.20, category: 'Food', date: '2023-05-10', receipt: true },
    { id: 2, title: 'Electricity Bill', amount: 120.00, category: 'Utilities', date: '2023-05-09', receipt: false },
    { id: 3, title: 'Movie Tickets', amount: 24.50, category: 'Entertainment', date: '2023-05-08', receipt: true },
    { id: 4, title: 'Gasoline', amount: 45.75, category: 'Transportation', date: '2023-05-07', receipt: true },
    { id: 5, title: 'Restaurant Dinner', amount: 68.30, category: 'Food', date: '2023-05-06', receipt: false },
    { id: 6, title: 'Internet Bill', amount: 59.99, category: 'Utilities', date: '2023-05-05', receipt: true },
    { id: 7, title: 'Clothing Purchase', amount: 120.45, category: 'Shopping', date: '2023-05-04', receipt: true },
    { id: 8, title: 'Public Transit Pass', amount: 75.00, category: 'Transportation', date: '2023-05-03', receipt: false },
  ];

  return (
    <div className="expense-list-page" ref={containerRef}>
      <div className="page-header">
        <h1>Expenses</h1>
        <Link to="/expenses/add" className="btn btn-primary">
          <FiPlus /> Add Expense
        </Link>
      </div>

      <div className="expense-filters card">
        <div className="filter-row">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search expenses..." className="search-input" />
          </div>
          
          <div className="filters">
            <div className="filter-group">
              <FiCalendar className="filter-icon" />
              <select className="filter-select">
                <option>All Time</option>
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
                <option>Custom Range</option>
              </select>
            </div>
            
            <div className="filter-group">
              <FiFilter className="filter-icon" />
              <select className="filter-select">
                <option>All Categories</option>
                <option>Food</option>
                <option>Transportation</option>
                <option>Entertainment</option>
                <option>Utilities</option>
                <option>Shopping</option>
              </select>
            </div>
            
            <button className="btn btn-secondary">
              <FiDownload /> Export
            </button>
          </div>
        </div>
      </div>

      <div className="expense-table-container card">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Receipt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense.id} ref={addToTableRowsRef}>
                <td>{expense.title}</td>
                <td>
                  <span className={`category-badge ${expense.category.toLowerCase()}`}>
                    {expense.category}
                  </span>
                </td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td className="amount">${expense.amount.toFixed(2)}</td>
                <td>
                  {expense.receipt ? (
                    <span className="receipt-badge yes">Yes</span>
                  ) : (
                    <span className="receipt-badge no">No</span>
                  )}
                </td>
                <td>
                  <div className="actions">
                    <Link to={`/expenses/edit/${expense.id}`} className="action-btn edit">
                      <FiEdit />
                    </Link>
                    <button className="action-btn delete">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="pagination-btn">Previous</button>
        <div className="pagination-numbers">
          <button className="pagination-number active">1</button>
          <button className="pagination-number">2</button>
          <button className="pagination-number">3</button>
          <span>...</span>
          <button className="pagination-number">10</button>
        </div>
        <button className="pagination-btn">Next</button>
      </div>
    </div>
  );
};

export default ExpenseList;