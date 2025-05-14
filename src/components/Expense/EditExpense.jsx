// pages/EditExpense.jsx
import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiDollarSign, FiCalendar, FiTag, FiFile, FiUpload } from 'react-icons/fi';
import anime from 'animejs/lib/anime.es.js';
import './ExpenseForm.css';

const EditExpense = () => {
  const { id } = useParams();
  const formRef = useRef(null);
  const elementsRef = useRef([]);
  
  // Mock data for the expense being edited
  const expense = {
    id: parseInt(id),
    title: 'Grocery Shopping',
    amount: 85.20,
    category: 'food',
    date: '2023-05-10',
    description: 'Weekly grocery shopping at Whole Foods.',
    receipt: true
  };

  useEffect(() => {
    // Animate the form
    anime({
      targets: formRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutExpo',
      duration: 600
    });

    // Animate form elements
    anime({
      targets: elementsRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100, {start: 300}),
      easing: 'easeOutExpo',
      duration: 500
    });
  }, []);

  const addToElementsRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div className="expense-form-page">
      <div className="page-header">
        <Link to="/expenses" className="back-link">
          <FiArrowLeft /> Back to Expenses
        </Link>
        <h1>Edit Expense</h1>
      </div>

      <div className="expense-form-container card" ref={formRef}>
        <form className="expense-form">
          <div className="form-grid">
            <div className="form-group" ref={addToElementsRef}>
              <label htmlFor="title">Expense Title</label>
              <input 
                type="text" 
                id="title" 
                placeholder="What did you spend on?" 
                defaultValue={expense.title}
                required
              />
            </div>

            <div className="form-group" ref={addToElementsRef}>
              <label htmlFor="amount">Amount</label>
              <div className="input-group">
                <FiDollarSign className="input-icon" />
                <input 
                  type="number" 
                  id="amount" 
                  placeholder="0.00" 
                  min="0" 
                  step="0.01" 
                  defaultValue={expense.amount}
                  required
                />
              </div>
            </div>

            <div className="form-group" ref={addToElementsRef}>
              <label htmlFor="category">Category</label>
              <div className="input-group">
                <FiTag className="input-icon" />
                <select id="category" defaultValue={expense.category} required>
                  <option value="">Select a category</option>
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
            </div>

            <div className="form-group" ref={addToElementsRef}>
              <label htmlFor="date">Date</label>
              <div className="input-group">
                <FiCalendar className="input-icon" />
                <input 
                  type="date" 
                  id="date" 
                  defaultValue={expense.date}
                  required
                />
              </div>
            </div>

            <div className="form-group full-width" ref={addToElementsRef}>
              <label htmlFor="description">Description (Optional)</label>
              <textarea 
                id="description" 
                placeholder="Add more details about this expense"
                defaultValue={expense.description}
                rows="3"
              ></textarea>
            </div>

            <div className="form-group full-width" ref={addToElementsRef}>
              <label>Receipt Upload</label>
              <div className="file-upload-container">
                {expense.receipt ? (
                  <div className="existing-receipt">
                    <div className="receipt-preview">
                      <FiFile className="receipt-icon" />
                      <p>receipt-image.jpg</p>
                    </div>
                    <div className="receipt-actions">
                      <button type="button" className="btn btn-secondary btn-sm">View</button>
                      <button type="button" className="btn btn-danger btn-sm">Remove</button>
                    </div>
                  </div>
                ) : (
                  <div className="file-upload-area">
                    <FiFile className="file-icon" />
                    <p>Drag & drop receipt image here or</p>
                    <label htmlFor="receipt" className="file-upload-btn">
                      <FiUpload /> Browse Files
                      <input type="file" id="receipt" accept="image/*" className="hidden-file-input" />
                    </label>
                    <p className="file-hint">Supports: JPG, PNG, PDF - Max 5MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-actions" ref={addToElementsRef}>
            <Link to="/expenses" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Update Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;