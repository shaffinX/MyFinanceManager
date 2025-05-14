// src/components/ReportsAnalytics.jsx
import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './ReportsAnalytics.css';

const ReportsAnalytics = () => {
  const [reportPeriod, setReportPeriod] = useState('monthly');
  const [reportType, setReportType] = useState('expense');
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    // Animate bar chart when component mounts or options change
    if (barChartRef.current) {
      anime({
        targets: '.bar-chart-container .bar',
        height: (el) => el.getAttribute('data-height'),
        duration: 1500,
        delay: anime.stagger(100),
        easing: 'easeInOutQuad'
      });
    }

    // Animate line chart path
    if (lineChartRef.current) {
      anime({
        targets: '.line-chart path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
      });

      anime({
        targets: '.line-chart-point',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(200),
        duration: 1000,
        easing: 'easeOutElastic(1, .5)'
      });
    }
  }, [reportPeriod, reportType]);

  return (
    <div className="reports-analytics-container">
      <h1 style={{textAlign:"center",paddingBottom:50}}>Reports & Analytics</h1>
      
      <div className="report-controls">
        <div className="report-period-selector">
          <button 
            className={`period-btn ${reportPeriod === 'weekly' ? 'active' : ''}`}
            onClick={() => setReportPeriod('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`period-btn ${reportPeriod === 'monthly' ? 'active' : ''}`}
            onClick={() => setReportPeriod('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`period-btn ${reportPeriod === 'yearly' ? 'active' : ''}`}
            onClick={() => setReportPeriod('yearly')}
          >
            Yearly
          </button>
        </div>
        
        <div className="report-type-selector">
          <button 
            className={`type-btn ${reportType === 'expense' ? 'active' : ''}`}
            onClick={() => setReportType('expense')}
          >
            Expenses
          </button>
          <button 
            className={`type-btn ${reportType === 'income' ? 'active' : ''}`}
            onClick={() => setReportType('income')}
          >
            Income
          </button>
          <button 
            className={`type-btn ${reportType === 'savings' ? 'active' : ''}`}
            onClick={() => setReportType('savings')}
          >
            Savings
          </button>
        </div>
      </div>
      
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-header">
            <h3>Total {reportType === 'expense' ? 'Expenses' : reportType === 'income' ? 'Income' : 'Savings'}</h3>
          </div>
          <div className="card-body">
            <div className="big-number">${reportType === 'expense' ? '2,450' : reportType === 'income' ? '4,200' : '1,750'}</div>
            <div className={`change ${reportType === 'expense' ? 'negative' : 'positive'}`}>
              {reportType === 'expense' ? '+12%' : '+8%'} from last {reportPeriod === 'weekly' ? 'week' : reportPeriod === 'monthly' ? 'month' : 'year'}
            </div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-header">
            <h3>Average Per {reportPeriod === 'weekly' ? 'Day' : reportPeriod === 'monthly' ? 'Week' : 'Month'}</h3>
          </div>
          <div className="card-body">
            <div className="big-number">${reportType === 'expense' ? '81' : reportType === 'income' ? '140' : '58'}</div>
            <div className="change neutral">based on {reportPeriod} data</div>
          </div>
        </div>
        
        <div className="summary-card">
          <div className="card-header">
            <h3>Top Category</h3>
          </div>
          <div className="card-body">
            <div className="big-number">
              {reportType === 'expense' ? 'Housing' : reportType === 'income' ? 'Salary' : 'Investments'}
            </div>
            <div className="change">
              ${reportType === 'expense' ? '735' : reportType === 'income' ? '3,500' : '875'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="charts-container">
        <div className="chart-section">
          <h2>
            {reportPeriod === 'weekly' ? 'Daily' : reportPeriod === 'monthly' ? 'Weekly' : 'Monthly'} 
            {' '}{reportType === 'expense' ? 'Expenses' : reportType === 'income' ? 'Income' : 'Savings'}
          </h2>
          <div className="bar-chart-container" ref={barChartRef}>
            {reportPeriod === 'monthly' && (
              <>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="65%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Week 1</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="75%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Week 2</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="45%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Week 3</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="90%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Week 4</div>
                </div>
              </>
            )}
            
            {reportPeriod === 'weekly' && (
              <>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="50%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Mon</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="70%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Tue</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="60%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Wed</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="40%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Thu</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="85%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Fri</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="95%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Sat</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="55%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Sun</div>
                </div>
              </>
            )}
            
            {reportPeriod === 'yearly' && (
              <>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="50%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Jan</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="60%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Feb</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="75%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Mar</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="65%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Apr</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="85%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">May</div>
                </div>
                <div className="bar-item">
                  <div className="bar-container">
                    <div className="bar" data-height="70%" style={{ backgroundColor: '#36A2EB' }}></div>
                  </div>
                  <div className="bar-label">Jun</div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="chart-section">
          <h2>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Trends</h2>
          <div className="line-chart-container" ref={lineChartRef}>
            <svg className="line-chart" viewBox="0 0 1000 300">
              <path 
                d="M50,250 C150,180 250,100 350,150 C450,200 550,250 650,210 C750,170 850,100 950,120" 
                fill="none" 
                stroke="#FF6384" 
                strokeWidth="3"
              />
              
              <circle className="line-chart-point" cx="50" cy="250" r="6" fill="#FF6384" />
              <circle className="line-chart-point" cx="216" cy="150" r="6" fill="#FF6384" />
              <circle className="line-chart-point" cx="383" cy="150" r="6" fill="#FF6384" />
              <circle className="line-chart-point" cx="550" cy="250" r="6" fill="#FF6384" />
              <circle className="line-chart-point" cx="716" cy="210" r="6" fill="#FF6384" />
              <circle className="line-chart-point" cx="883" cy="100" r="6" fill="#FF6384" />
              <circle className="line-chart-point" cx="950" cy="120" r="6" fill="#FF6384" />
            </svg>
            
            <div className="chart-x-labels">
              {reportPeriod === 'monthly' && (
                <>
                  <span>Jan 1</span>
                  <span>Jan 7</span>
                  <span>Jan 14</span>
                  <span>Jan 21</span>
                  <span>Jan 28</span>
                </>
              )}
              
              {reportPeriod === 'weekly' && (
                <>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </>
              )}
              
              {reportPeriod === 'yearly' && (
                <>
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Sep</span>
                  <span>Nov</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="reports-section">
        <h2>Financial Reports</h2>
        <div className="reports-cards">
          <div className="report-card">
            <div className="report-icon">📊</div>
            <h3>Income Statement</h3>
            <p>View your revenues, expenses, and net income for the selected period.</p>
            <div className="report-actions">
              <button className="report-action-btn">View</button>
              <button className="report-action-btn">Download</button>
            </div>
          </div>
          
          <div className="report-card">
            <div className="report-icon">📑</div>
            <h3>Balance Sheet</h3>
            <p>Overview of your assets, liabilities, and equity at the current time.</p>
            <div className="report-actions">
              <button className="report-action-btn">View</button>
              <button className="report-action-btn">Download</button>
            </div>
          </div>
          
          <div className="report-card">
            <div className="report-icon">📓</div>
            <h3>Cash Flow Statement</h3>
            <p>Track how cash moved in and out of your accounts during this period.</p>
            <div className="report-actions">
              <button className="report-action-btn">View</button>
              <button className="report-action-btn">Download</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="custom-report-section">
        <h2>Generate Custom Report</h2>
        <div className="custom-report-form">
          <div className="form-row">
            <div className="form-group">
              <label>Report Type</label>
              <select>
                <option>Expense Report</option>
                <option>Income Report</option>
                <option>Savings Report</option>
                <option>Budget Comparison</option>
                <option>Category Analysis</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Date Range</label>
              <select>
                <option>Current Month</option>
                <option>Previous Month</option>
                <option>Current Quarter</option>
                <option>Year to Date</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Categories to Include</label>
              <select multiple>
                <option>All Categories</option>
                <option>Housing</option>
                <option>Food</option>
                <option>Transportation</option>
                <option>Utilities</option>
                <option>Entertainment</option>
                <option>Shopping</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Report Format</label>
              <div className="format-options">
                <label>
                  <input type="radio" name="format" checked /> PDF
                </label>
                <label>
                  <input type="radio" name="format" /> Excel
                </label>
                <label>
                  <input type="radio" name="format" /> CSV
                </label>
              </div>
            </div>
          </div>
          
          <button className="generate-report-btn">Generate Report</button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;