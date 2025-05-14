// src/components/SavingsIntelligence.jsx
import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './SavingsIntelligence.css';

const SavingsIntelligence = () => {
  const chartRef = useRef(null);
  const savingsTrendRef = useRef(null);

  useEffect(() => {
    // Animate the chart elements when component mounts
    if (chartRef.current) {
      anime({
        targets: '.chart-bar',
        height: (el) => el.getAttribute('data-height'),
        duration: 1500,
        delay: anime.stagger(100),
        easing: 'easeInOutQuad'
      });
    }

    // Animate the savings trend line
    if (savingsTrendRef.current) {
      anime({
        targets: '.trend-line path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
      });
    }
  }, []);

  return (
    <div className="savings-intelligence-container">
      <h1 className="section-title">Savings Intelligence</h1>
      
      <div className="insight-cards">
        <div className="insight-card">
          <div className="card-header">
            <h3>Monthly Savings</h3>
          </div>
          <div className="card-body">
            <div className="big-number">$752</div>
            <div className="change positive">+5.2% from last month</div>
          </div>
        </div>
        
        <div className="insight-card">
          <div className="card-header">
            <h3>Savings Rate</h3>
          </div>
          <div className="card-body">
            <div className="big-number">23%</div>
            <div className="change negative">-2.1% from last month</div>
          </div>
        </div>
        
        <div className="insight-card">
          <div className="card-header">
            <h3>Potential Annual Savings</h3>
          </div>
          <div className="card-body">
            <div className="big-number">$9,024</div>
            <div className="change neutral">at current rate</div>
          </div>
        </div>
      </div>

      <div className="savings-trend-section">
        <h2>Savings Trend Analysis</h2>
        <div className="chart-container" ref={savingsTrendRef}>
          <svg className="trend-line" viewBox="0 0 1000 300">
            <path 
              d="M0,150 C100,100 200,50 300,60 C400,70 500,170 600,190 C700,210 800,190 900,120 L900,300 L0,300 Z" 
              fill="rgba(75, 192, 192, 0.2)" 
              stroke="rgba(75, 192, 192, 1)" 
              strokeWidth="3"
            />
          </svg>
          <div className="chart-labels">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
      </div>

      <div className="impact-section">
        <h2>Categories Affecting Your Savings</h2>
        <div className="chart-bars" ref={chartRef}>
          <div className="chart-item">
            <div className="chart-label">
              <span>Dining</span>
            </div>
            <div className="chart-bar-container">
              <div className="chart-bar negative" data-height="70%"></div>
            </div>
            <div className="chart-value">-$120</div>
          </div>
          
          <div className="chart-item">
            <div className="chart-label">
              <span>Entertainment</span>
            </div>
            <div className="chart-bar-container">
              <div className="chart-bar negative" data-height="45%"></div>
            </div>
            <div className="chart-value">-$75</div>
          </div>
          
          <div className="chart-item">
            <div className="chart-label">
              <span>Groceries</span>
            </div>
            <div className="chart-bar-container">
              <div className="chart-bar positive" data-height="30%"></div>
            </div>
            <div className="chart-value">+$50</div>
          </div>
          
          <div className="chart-item">
            <div className="chart-label">
              <span>Transportation</span>
            </div>
            <div className="chart-bar-container">
              <div className="chart-bar positive" data-height="60%"></div>
            </div>
            <div className="chart-value">+$95</div>
          </div>
        </div>
      </div>

      <div className="optimization-section">
        <h2>Savings Optimization</h2>
        <div className="optimization-cards">
          <div className="optimization-card">
            <div className="optimization-icon">💡</div>
            <h3>Reduce Dining Out</h3>
            <p>Reducing dining expenses by 20% could increase monthly savings by $85.</p>
            <button className="action-button">See Details</button>
          </div>
          
          <div className="optimization-card">
            <div className="optimization-icon">🎯</div>
            <h3>Entertainment Budget</h3>
            <p>Setting a fixed entertainment budget could help save an additional $60 monthly.</p>
            <button className="action-button">See Details</button>
          </div>
          
          <div className="optimization-card">
            <div className="optimization-icon">🔄</div>
            <h3>Subscription Audit</h3>
            <p>Review your subscriptions to potentially save $45 per month.</p>
            <button className="action-button">See Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsIntelligence;