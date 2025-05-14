// pages/Login.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import './Auth.css';

const Login = () => {
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
          <h2 ref={addToElementsRef}>Welcome Back</h2>
          <p ref={addToElementsRef}>Sign in to continue to your account</p>
        </div>
        <form className="auth-form">
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
              placeholder="Enter your password" 
              required
            />
          </div>
          <div className="form-action" ref={addToElementsRef}>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="auth-footer" ref={addToElementsRef}>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;