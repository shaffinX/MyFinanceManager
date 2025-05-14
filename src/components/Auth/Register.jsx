// pages/Register.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import './Auth.css';

const Register = () => {
  const formRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    anime({
      targets: formRef.current,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      easing: 'easeOutExpo'
    });

    anime({
      targets: elementsRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100, {start: 300}),
      easing: 'easeOutExpo'
    });
  }, []);

  const addToElementsRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container" ref={formRef}>
        <div className="auth-header">
          <h2 ref={addToElementsRef}>Create Account</h2>
          <p ref={addToElementsRef}>Sign up to start tracking your finances</p>
        </div>
        <form className="auth-form">
          <div className="form-group" ref={addToElementsRef}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your full name" 
              required
            />
          </div>
          <div className="form-group" ref={addToElementsRef}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              required
            />
          </div>
          <div className="form-group" ref={addToElementsRef}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Create a password" 
              required
            />
          </div>
          <div className="form-group" ref={addToElementsRef}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Confirm your password" 
              required
            />
          </div>
          <div className="form-action" ref={addToElementsRef}>
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </div>
        </form>
        <div className="auth-footer" ref={addToElementsRef}>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;