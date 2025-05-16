// pages/Register.jsx
import React, { useEffect, useRef,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const formRef = useRef(null);
  const elementsRef = useRef([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();
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


  const RegisterUser = (e) => {
    e.preventDefault();
    if(name&&email&&password){
      axios.post(`${process.env.REACT_APP_API}register`, {
        name,
        email,
        password
      }).then((response) => {
        if (response.status === 200) {
          console.log('User registered successfully');
          nav('/login');
        } else {
          alert('Registration failed');
        }
      }).catch((error) => {
        alert(error.response.data);
        console.error('Error during registration:', error);
      });
    }
    else{
      alert("Please fill all the fields");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container" ref={formRef}>
        <div className="auth-header">
          <h2 ref={addToElementsRef}>Create Account</h2>
          <p ref={addToElementsRef}>Sign up to start tracking your finances</p>
        </div>
        <form className="auth-form" onSubmit={RegisterUser}>
          <div className="form-group" ref={addToElementsRef}>
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your full name" 
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group" ref={addToElementsRef}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group" ref={addToElementsRef}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Create a password" 
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group" ref={addToElementsRef}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Confirm your password" 
              required
              onChange={(e) => setPassword(e.target.value)}
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