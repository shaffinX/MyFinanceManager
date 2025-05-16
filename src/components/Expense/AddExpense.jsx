// pages/AddExpense.jsx
import React, { useEffect, useRef,useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDollarSign, FiCalendar, FiTag, FiFile, FiUpload } from 'react-icons/fi';
import anime from 'animejs/lib/anime.es.js';
import './ExpenseForm.css';
import {handleAddExpense} from './ExpenseHandle.js';

const AddExpense = () => {
  const formRef = useRef(null);
  const elementsRef = useRef([]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [receipt, setReceipt] = useState(false);
  const nav = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title && amount && category && date) {
      handleAddExpense(title, amount, category, date, receipt)
      .then((response) => {
        if (response) {
          alert('Expense added successfully!');
          // Redirect or perform any other action
          nav('/expenses')
        } else {
          alert('Failed to add expense. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
        alert('An error occurred. Please try again.');
      });
    }
  }

  return (
    <div className="expense-form-page">
      <div className="page-header">
        <Link to="/expenses" className="back-link">
          <FiArrowLeft /> Back to Expenses
        </Link>
        <h1>Add New Expense</h1>
      </div>

      <div className="expense-form-container card" ref={formRef}>
        <form className="expense-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group" ref={addToElementsRef}>
              <label htmlFor="title">Expense Title</label>
              <input 
                type="text" 
                id="title" 
                placeholder="What did you spend on?" 
                required
                onChange={(e) => setTitle(e.target.value)}
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
                  required
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value < 0) {
                      e.target.value = 0;
                    } 
                    setAmount(value);
                  }}
                />
              </div>
            </div>

            <div className="form-group" ref={addToElementsRef}>
              <label htmlFor="category">Category</label>
              <div className="input-group">
                <FiTag className="input-icon" />
                <select
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
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
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group full-width" ref={addToElementsRef}>
              <label htmlFor="description">Description (Optional)</label>
              <textarea 
                id="description" 
                placeholder="Add more details about this expense"
                rows="3"
              ></textarea>
            </div>

            <div className="form-group full-width" ref={addToElementsRef}>
              <label>Receipt Upload (Optional)</label>
              <div className="file-upload-container">
                <div className="file-upload-area">
                  <FiFile className="file-icon" />
                  <p>Drag & drop receipt image here or</p>
                  <label htmlFor="receipt" className="file-upload-btn">
                    <FiUpload /> Browse Files
                    <input type="file" id="receipt" accept="image/*" className="hidden-file-input" onChange={(e)=>{
                      if(e.target.files.length > 0) {
                        setReceipt(true);
                      }
                      else {
                        setReceipt(false);
                      }
                    }}/>
                  </label>
                  <p className="file-hint">Supports: JPG, PNG, PDF - Max 5MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions" ref={addToElementsRef}>
            <Link to="/expenses" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;