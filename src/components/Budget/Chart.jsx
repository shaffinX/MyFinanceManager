import React from 'react';
import './BudgetManagement.css';
const categories = [
  'food',
  'transportation',
  'entertainment',
  'utilities',
  'shopping',
  'health',
  'housing',
  'education',
  'other',
];

const Chart = ({ budget, expenses }) => {
  // Group budget and expenses by category
  const categoryData = categories.map((category) => {
    const totalBudget = budget
      .filter((b) => b.category.toLowerCase() === category)
      .reduce((sum, b) => sum + b.amount, 0);

    const totalExpense = expenses
      .filter((e) => e.category.toLowerCase() === category)
      .reduce((sum, e) => sum + e.amount, 0);

    return {
      category,
      budget: totalBudget,
      expense: totalExpense,
    };
  });

  // Find the maximum value to normalize bar heights
  const maxAmount = Math.max(
    ...categoryData.map((item) => Math.max(item.budget, item.expense, 1)) // fallback to 1
  );

  return (
    <div className="budget-comparison">
      <h2>Budget vs. Expenses</h2>
      <div className="comparison-chart">
        <div className="chart-placeholder">
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color budget-color"></div>
              <span>Budget</span>
            </div>
            <div className="legend-item">
              <div className="legend-color expense-color"></div>
              <span>Expense</span>
            </div>
          </div>

          <div className="chart-bars">
            {categoryData.map(({ category, budget, expense }) => (
              <div key={category} className="chart-bar-group">
                <div className="chart-bar-container">
                  <div
                    className="chart-bar budget-bar-graph"
                    style={{ height: `${(budget / maxAmount) * 100}%` }}
                  ></div>
                  <div
                    className="chart-bar expense-bar-graph"
                    style={{ height: `${(expense / maxAmount) * 100}%` }}
                  ></div>
                </div>
                <div className="chart-label">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
