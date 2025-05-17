import React, { useEffect, useRef, useMemo } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './SavingsIntelligence.css';

// Helper to map savings to SVG Y (inverted coordinate system)
const getY = (amount, min, max, height) => {
  if (max === min) return height;
  return height - ((amount - min) / (max - min)) * height;
};

const months = [
  'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
];

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 300;

const SavingsIntelligence = ({ monthlySavings, yearlySavings }) => {
  const savingsTrendRef = useRef(null);

  // Calculate Potential Annual Savings
  const potentialAnnualSavings = useMemo(
    () =>
      Array.isArray(yearlySavings)
        ? yearlySavings.reduce((sum, v) => sum + (Number(v) || 0), 0)
        : 0,
    [yearlySavings]
  );

  // Savings Rate not available (no income)
  const savingsRate = '—';

  // Memoize path calculation for performance
  const { path, area } = useMemo(() => {
    const data = yearlySavings && yearlySavings.length === 12
      ? yearlySavings
      : new Array(12).fill(0);

    const min = Math.min(...data);
    const max = Math.max(...data) || 1;

    const step = SVG_WIDTH / 11;
    const points = data.map((amt, i) => [
      i * step,
      getY(amt, min, max, SVG_HEIGHT - 40) + 20,
    ]);

    const path =
      points.reduce(
        (acc, [x, y], idx) =>
          idx === 0
            ? `M${x},${y}`
            : acc + ` L${x},${y}`,
        ''
      );

    const area =
      points.reduce(
        (acc, [x, y], idx) =>
          idx === 0
            ? `M${x},${SVG_HEIGHT} L${x},${y}`
            : acc + ` L${x},${y}`,
        ''
      ) +
      ` L${SVG_WIDTH},${SVG_HEIGHT} Z`;

    return { path, area };
  }, [yearlySavings]);

  useEffect(() => {
    if (savingsTrendRef.current) {
      anime({
        targets: '.trend-line path.trend',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
      });
      anime({
        targets: '.trend-line path.area',
        opacity: [0, 1],
        duration: 1400,
        easing: 'linear',
      });
    }
  }, [path, area]);

  return (
    <div className="savings-intelligence-container">
      <h1 className="section-title">Savings Intelligence</h1>
      
      <div className="insight-cards">
        <div className="insight-card">
          <div className="card-header"><h3>Monthly Savings</h3></div>
          <div className="card-body">
            <div className="big-number">Rs.{monthlySavings}</div>
          </div>
        </div>
        <div className="insight-card">
          <div className="card-header"><h3>Savings Rate</h3></div>
          <div className="card-body">
            <div className="big-number">{savingsRate}</div>
            <div className="change neutral">Yearly income not set</div>
          </div>
        </div>
        <div className="insight-card">
          <div className="card-header"><h3>Potential Annual Savings</h3></div>
          <div className="card-body">
            <div className="big-number">
              ${potentialAnnualSavings.toLocaleString()}
            </div>
            <div className="change neutral">at current rate</div>
          </div>
        </div>
      </div>

      <div className="savings-trend-section">
        <h2>Savings Trend Analysis</h2>
        <div className="chart-container" ref={savingsTrendRef}>
          <svg className="trend-line" viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} width="100%" height="220">
            <path 
              className="area"
              d={area}
              fill="rgba(75, 192, 192, 0.2)"
              stroke="none"
              opacity="0"
            />
            <path 
              className="trend"
              d={path}
              fill="none"
              stroke="rgba(75, 192, 192, 1)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {
              yearlySavings.map((amt, i) => {
                const step = SVG_WIDTH / 11;
                const x = i * step;
                const y = getY(amt, Math.min(...yearlySavings), Math.max(...yearlySavings) || 1, SVG_HEIGHT - 40) + 20;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={6}
                    fill="#4bc0c0"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                );
              })
            }
          </svg>
          <div className="chart-labels">
            {months.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
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