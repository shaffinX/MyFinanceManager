// pages/EditExpense.jsx
import React, { useEffect, useRef,useState } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDollarSign, FiCalendar, FiTag} from 'react-icons/fi';
import anime from 'animejs/lib/anime.es.js';
import './ExpenseForm.css';
import {getExpenseById,updateExpense} from './ExpenseHandle.js';

const EditExpense = () => {
  const { id } = useParams();
  const formRef = useRef(null);
  const elementsRef = useRef([]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const nav = useNavigate();

  const fetchExpense = async () => {
    let x = await getExpenseById(id);    
    setTitle(x.title);
    setAmount(x.amount);
    setCategory(x.category);
    setDate(x.date);
  }
  
  useEffect(() => {
    fetchExpense();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToElementsRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(title && amount && category && date) {
      updateExpense(id,title, amount, category, date)
      .then((response) => {
        if (response) {
          alert('Expense updated successfully!');
          // Redirect or perform any other action
          nav('/expenses')
        } else {
          alert('Failed to update expense. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error updating expense:', error);
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  return (
    <div className="expense-form-page">
      <div className="page-header">
        <Link to="/expenses" className="back-link">
          <FiArrowLeft /> Back to Expenses
        </Link>
        <h1>Edit Expense</h1>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value < 0) {
                      e.target.value = 0;
                    }
                    setAmount(value);
                  }}
                  required
                />
              </div>
            </div>

            <div className="form-group" ref={addToElementsRef}>
              <label htmlFor="category">Category</label>
              <div className="input-group">
                <FiTag className="input-icon" />
                <select id="category" value={category} required onChange={(e) => setCategory(e.target.value)}>
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
                  value={date}
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
                defaultValue={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                rows="3"
              ></textarea>
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