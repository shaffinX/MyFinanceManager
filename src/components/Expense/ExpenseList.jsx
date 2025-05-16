// pages/ExpenseList.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit, FiTrash2, FiFilter, FiSearch, FiDownload, FiCalendar } from 'react-icons/fi';
import anime from 'animejs/lib/anime.es.js';
import './ExpenseList.css';
import { getExpenses, deleteExpense } from './ExpenseHandle';

const ExpenseList = () => {
  const containerRef = useRef(null);
  const tableRowsRef = useRef([]);

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [timeFilter, setTimeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchExpenses = async () => {
    let expen = await getExpenses();
    setExpenses(expen);
    setFilteredExpenses(expen);
  };

  useEffect(() => {
    fetchExpenses();
    // Animate the container
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutExpo',
      duration: 600
    });
  }, []);

  useEffect(() => {
    // Apply filters when filter values change
    applyFilters();
    
    // Animate table rows after filtering
    anime({
      targets: tableRowsRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(50, { start: 300 }),
      easing: 'easeOutExpo',
      duration: 500
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, timeFilter, categoryFilter, searchQuery]);

  const applyFilters = () => {
    // Reset ref for animation
    tableRowsRef.current = [];
    
    let result = [...expenses];

    // Apply time filter
    if (timeFilter !== 'all') {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      switch (timeFilter) {
        case 'thisMonth':
          result = result.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === currentMonth && 
                   expenseDate.getFullYear() === currentYear;
          });
          break;
        case 'lastMonth':
          result = result.filter(expense => {
            const expenseDate = new Date(expense.date);
            const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
            return expenseDate.getMonth() === lastMonth && 
                   expenseDate.getFullYear() === lastMonthYear;
          });
          break;
        case 'last3Months':
          result = result.filter(expense => {
            const expenseDate = new Date(expense.date);
            const threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            return expenseDate >= threeMonthsAgo;
          });
          break;
        case 'thisYear':
          result = result.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getFullYear() === currentYear;
          });
          break;
        default:
          break;
      }
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(expense => 
        expense.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(expense => 
        expense.title.toLowerCase().includes(query) || 
        expense.category.toLowerCase().includes(query)
      );
    }

    setFilteredExpenses(result);
  };

  const addToTableRowsRef = (el) => {
    if (el && !tableRowsRef.current.includes(el)) {
      tableRowsRef.current.push(el);
    }
  };

  const handleDelete = async (id) => {
    const isDeleted = await deleteExpense(id);
    if (isDeleted) {
      window.location.reload();
    } else {
      alert("Error deleting expense");
    }
  };

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleExport = () => {
    // Implement export functionality
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Title,Category,Date,Amount,Receipt\n"
      + filteredExpenses.map(expense => 
          `"${expense.title}","${expense.category}","${new Date(expense.date).toLocaleDateString()}",${expense.amount},${expense.receipt ? "Yes" : "No"}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expense_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <input 
              type="text" 
              placeholder="Search expenses..." 
              className="search-input" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="filters">
            <div className="filter-group">
              <FiCalendar className="filter-icon" />
              <select 
                className="filter-select" 
                value={timeFilter}
                onChange={handleTimeFilterChange}
              >
                <option value="all">All Time</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="last3Months">Last 3 Months</option>
                <option value="thisYear">This Year</option>
              </select>
            </div>
            
            <div className="filter-group">
              <FiFilter className="filter-icon" />
              <select 
                className="filter-select"
                value={categoryFilter}
                onChange={handleCategoryFilterChange}
              >
                <option value="all">All Categories</option>
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
            
            <button className="btn btn-secondary" onClick={handleExport}>
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
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <tr key={expense._id} ref={addToTableRowsRef}>
                  <td>{expense.title}</td>
                  <td>
                    <span className={`category-badge ${expense.category.toLowerCase()}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="amount">Rs.{expense.amount.toFixed(0)}</td>
                  <td>
                    {expense.receipt ? (
                      <span className="receipt-badge yes">Yes</span>
                    ) : (
                      <span className="receipt-badge no">No</span>
                    )}
                  </td>
                  <td>
                    <div className="actions">
                      <Link to={`/expenses/edit/${expense._id}`} className="action-btn edit">
                        <FiEdit />
                      </Link>
                      <button 
                        className="action-btn delete" 
                        onClick={(e) => {
                          handleDelete(expense._id);
                          e.preventDefault();
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-expenses">
                  No expenses match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredExpenses.length > 0 && (
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
      )}
    </div>
  );
};

export default ExpenseList;