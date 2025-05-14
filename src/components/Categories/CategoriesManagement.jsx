// src/components/CategoriesManagement.jsx
import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './CategoriesManagement.css';

const CategoriesManagement = () => {
  const [activeTab, setActiveTab] = useState('default');
  const chartRef = useRef(null);

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

  useEffect(() => {
    // Animate pie chart segments when component mounts
    if (chartRef.current) {
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
        targets: '.category-item',
        translateX: [50, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: anime.stagger(100)
      });
    }
  }, [activeTab]);

  // Function to create pie chart paths
  const createPieSegments = (categories) => {
    const segments = [];
    let startAngle = 0;
    
    categories.forEach((category, index) => {
      const angleValue = (category.percentage / 100) * 360;
      const endAngle = startAngle + angleValue;
      
      // Calculate segment path (simplified version)
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
            <div className="distribution-chart" ref={chartRef}>
              <div className="pie-chart-container">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  {createPieSegments(defaultCategories.concat(customCategories))}
                </svg>
                <div className="chart-center">
                  <span>Total</span>
                  <span className="big-text">$4,250</span>
                </div>
              </div>
              
              <div className="chart-legend">
                {defaultCategories.concat(customCategories).map(category => (
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
                  <li>
                    <span className="category-name">Housing</span>
                    <span className="percentage-value">30%</span>
                  </li>
                  <li>
                    <span className="category-name">Food</span>
                    <span className="percentage-value">15%</span>
                  </li>
                  <li>
                    <span className="category-name">Transportation</span>
                    <span className="percentage-value">10%</span>
                  </li>
                </ol>
              </div>
              
              <div className="insight-card">
                <h3>Category Growth</h3>
                <div className="growth-item">
                  <div className="growth-info">
                    <span className="category-name">Entertainment</span>
                    <span className="growth-value increase">+2.5%</span>
                  </div>
                  <div className="growth-bar">
                    <div className="growth-progress increase" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div className="growth-item">
                  <div className="growth-info">
                    <span className="category-name">Utilities</span>
                    <span className="growth-value decrease">-1.2%</span>
                  </div>
                  <div className="growth-bar">
                    <div className="growth-progress decrease" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div className="growth-item">
                  <div className="growth-info">
                    <span className="category-name">Groceries</span>
                    <span className="growth-value increase">+0.8%</span>
                  </div>
                  <div className="growth-bar">
                    <div className="growth-progress increase" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesManagement;