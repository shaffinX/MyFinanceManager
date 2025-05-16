import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './CategoriesManagement.css';
import { getExpenses } from '../Expense/ExpenseHandle';
/* eslint-disable react-hooks/exhaustive-deps */

const CategoriesManagement = () => {
  const [activeTab, setActiveTab] = useState('default');
  const chartRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  const defaultCategories = [
    { id: 1, name: 'Housing', color: '#FF6384', percentage: 30 },
    { id: 2, name: 'Food', color: '#36A2EB', percentage: 15 },
    { id: 3, name: 'Transportation', color: '#FFCE56', percentage: 10 },
    { id: 4, name: 'Utilities', color: '#4BC0C0', percentage: 8 },
    { id: 5, name: 'Healthcare', color: '#9966FF', percentage: 7 },
    { id: 6, name: 'Entertainment', color: '#FF9F40', percentage: 5 },
    { id: 7, name: 'Shopping', color: '#C9CBCF', percentage: 10 },
    { id: 8, name: 'Savings', color: '#7CFC00', percentage: 15 }
  ];

  const customCategories = [
    { id: 9, name: 'Gaming', color: '#FF5733', percentage: 4 },
    { id: 10, name: 'Books', color: '#33FF57', percentage: 3 },
    { id: 11, name: 'Coffee', color: '#5733FF', percentage: 2 }
  ];

  // Category color mapping
  const categoryColorMap = {
    'food': '#36A2EB',
    'transportation': '#FFCE56',
    'entertainment': '#FF9F40',
    'utilities': '#4BC0C0',
    'shopping': '#C9CBCF',
    'health': '#9966FF',
    'housing': '#FF6384',
    'education': '#33FF57',
    'other': '#5733FF'
  };

  // Function to fetch expenses data
  useEffect(() => {
    if (activeTab === 'analysis') {
      fetchExpenseData();
    }
  }, [activeTab]);

  const fetchExpenseData = async () => {
    setLoading(true);
    try {
      const data = await getExpenses();
      setExpenseData(data);
      processExpenseData(data);
    } catch (error) {
      console.error("Error fetching expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Process expense data to get category percentages
  const processExpenseData = (data) => {
    if (!data || data.length === 0) return;
    
    // Calculate total expense amount
    const total = data.reduce((sum, expense) => sum + Number(expense.amount), 0);
    setTotalExpense(total);
    
    // Group expenses by category
    const categoryTotals = data.reduce((acc, expense) => {
      const category = expense.category || 'other';
      acc[category] = (acc[category] || 0) + Number(expense.amount);
      return acc;
    }, {});
    
    // Calculate percentages and create category data objects
    const categories = Object.keys(categoryTotals).map((category, index) => {
      const amount = categoryTotals[category];
      const percentage = parseFloat(((amount / total) * 100).toFixed(1));
      
      return {
        id: index + 1,
        name: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize first letter
        color: categoryColorMap[category] || `hsl(${index * 30}, 70%, 50%)`,
        percentage,
        amount
      };
    });
    
    // Sort categories by percentage (descending)
    categories.sort((a, b) => b.percentage - a.percentage);
    setCategoryData(categories);
  };

  useEffect(() => {
    // Animate pie chart segments when component mounts or when category data changes    
    if (chartRef.current && activeTab === 'analysis') {
      anime({
        targets: '.pie-segment',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: anime.stagger(150),
        direction: 'normal',
        loop: false
      });

      anime({
        targets: '.category-item, .legend-item',
        translateX: [50, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: anime.stagger(100)
      });
    }
  }, [activeTab, categoryData]);

  // Function to create pie chart paths
  const createPieSegments = (categories) => {
    if (!categories || categories.length === 0) return [];
    
    const segments = [];
    let startAngle = 0;
    
    categories.forEach((category, index) => {
      const angleValue = (category.percentage / 100) * 360;
      const endAngle = startAngle + angleValue;
      
      // Calculate segment path
      const startRadians = (startAngle - 90) * Math.PI / 180;
      const endRadians = (endAngle - 90) * Math.PI / 180;
      
      const startX = 100 + 80 * Math.cos(startRadians);
      const startY = 100 + 80 * Math.sin(startRadians);
      const endX = 100 + 80 * Math.cos(endRadians);
      const endY = 100 + 80 * Math.sin(endRadians);
      
      const largeArcFlag = angleValue > 180 ? 1 : 0;
      
      const pathData = `M 100 100 L ${startX} ${startY} A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
      
      segments.push(
        <path
          key={index}
          className="pie-segment"
          d={pathData}
          fill={category.color}
          stroke="#fff"
          strokeWidth="1"
        />
      );
      
      startAngle = endAngle;
    });
    
    return segments;
  };

  // Find top spending categories
  const getTopSpendingCategories = () => {
    return categoryData.slice(0, 3);
  };

  // Calculate category growth (this is a placeholder since we don't have historical data)
  // In a real implementation, you would compare current month data to previous month
  const getCategoryGrowth = () => {
    // For demo purposes, we'll create some mock growth data
    // In a real app, you would compare with previous period data
    const mockGrowthData = [
      { category: categoryData[0]?.name || 'Entertainment', growth: 2.5, direction: 'increase' },
      { category: categoryData[1]?.name || 'Utilities', growth: -1.2, direction: 'decrease' },
      { category: categoryData[2]?.name || 'Groceries', growth: 0.8, direction: 'increase' }
    ];
    
    return mockGrowthData;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'pkr',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="categories-management-container">
      <h1 style={{textAlign:"center",paddingBottom:50}}>Categories Management</h1>
      
      <div className="tabs-container">
        <div 
          className={`tab ${activeTab === 'default' ? 'active' : ''}`} 
          onClick={() => setActiveTab('default')}
        >
          Default Categories
        </div>
        <div 
          className={`tab ${activeTab === 'custom' ? 'active' : ''}`} 
          onClick={() => setActiveTab('custom')}
        >
          Custom Categories
        </div>
        <div 
          className={`tab ${activeTab === 'analysis' ? 'active' : ''}`} 
          onClick={() => setActiveTab('analysis')}
        >
          Expense Distribution
        </div>
      </div>
      
      <div className="tab-content">
        {activeTab === 'default' && (
          <div className="categories-list">
            <div className="categories-header">
              <div className="header-name">Category Name</div>
              <div className="header-color">Color</div>
              <div className="header-actions">Actions</div>
            </div>
            
            {defaultCategories.map(category => (
              <div key={category.id} className="category-item">
                <div className="category-name">{category.name}</div>
                <div className="category-color">
                  <div className="color-preview" style={{ backgroundColor: category.color }}></div>
                </div>
                <div className="category-actions">
                  <button className="action-btn edit">Edit</button>
                  <button className="action-btn hide">Hide</button>
                </div>
              </div>
            ))}
            
            <div className="categories-actions">
              <button className="primary-button">Reset to Default</button>
            </div>
          </div>
        )}
        
        {activeTab === 'custom' && (
          <div className="custom-categories">
            <div className="categories-list">
              <div className="categories-header">
                <div className="header-name">Category Name</div>
                <div className="header-color">Color</div>
                <div className="header-actions">Actions</div>
              </div>
              
              {customCategories.map(category => (
                <div key={category.id} className="category-item">
                  <div className="category-name">{category.name}</div>
                  <div className="category-color">
                    <div className="color-preview" style={{ backgroundColor: category.color }}></div>
                  </div>
                  <div className="category-actions">
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="add-category-form">
              <h3>Add New Category</h3>
              <div className="form-group">
                <label>Category Name</label>
                <input type="text" placeholder="Enter category name" />
              </div>
              
              <div className="form-group">
                <label>Select Color</label>
                <div className="color-picker">
                  <div className="color-option" style={{ backgroundColor: '#FF6384' }}></div>
                  <div className="color-option" style={{ backgroundColor: '#36A2EB' }}></div>
                  <div className="color-option" style={{ backgroundColor: '#FFCE56' }}></div>
                  <div className="color-option" style={{ backgroundColor: '#4BC0C0' }}></div>
                  <div className="color-option" style={{ backgroundColor: '#9966FF' }}></div>
                  <div className="color-option selected" style={{ backgroundColor: '#FF9F40' }}></div>
                </div>
              </div>
              
              <button className="primary-button">Add Category</button>
            </div>
          </div>
        )}
        
        {activeTab === 'analysis' && (
          <div className="expense-distribution">
            {loading ? (
              <div className="loading-spinner">Loading expense data...</div>
            ) : (
              <>
                <div className="distribution-chart" ref={chartRef}>
                  <div className="pie-chart-container">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      {createPieSegments(categoryData.length > 0 ? categoryData : defaultCategories.concat(customCategories))}
                    </svg>
                    <div className="chart-center">
                      <span>Total</span>
                      <span className="big-text">{formatCurrency(totalExpense)}</span>
                    </div>
                  </div>
                  
                  <div className="chart-legend">
                    {(categoryData.length > 0 ? categoryData : defaultCategories.concat(customCategories)).map(category => (
                      <div key={category.id} className="legend-item">
                        <div className="legend-color" style={{ backgroundColor: category.color }}></div>
                        <div className="legend-name">{category.name}</div>
                        <div className="legend-percentage">{category.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="distribution-insights">
                  <div className="insight-card">
                    <h3>Top Spending Categories</h3>
                    <ol className="insights-list">
                      {getTopSpendingCategories().map((category, index) => (
                        <li key={index}>
                          <span className="category-name">{category.name}</span>
                          <span className="percentage-value">{category.percentage}%</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="insight-card">
                    <h3>Category Growth</h3>
                    {getCategoryGrowth().map((item, index) => (
                      <div key={index} className="growth-item">
                        <div className="growth-info">
                          <span className="category-name">{item.category}</span>
                          <span className={`growth-value ${item.direction}`}>
                            {item.growth > 0 ? '+' : ''}{item.growth}%
                          </span>
                        </div>
                        <div className="growth-bar">
                          <div 
                            className={`growth-progress ${item.direction}`} 
                            style={{ width: `${Math.abs(item.growth) * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesManagement;