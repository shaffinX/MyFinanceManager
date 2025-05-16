// pages/Login.jsx
import { useEffect, useRef,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import './Auth.css';
import axios from 'axios';
import Cookies from 'js-cookie';

/* eslint-disable react-hooks/exhaustive-deps */

const Login = () => {
  const formRef = useRef(null);
  const elementsRef = useRef([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();

  useEffect(() => {
    skipLogin();
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
      // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const addToElementsRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      Cookies.remove('token');
      Cookies.remove('user_email');
      axios.post(`${process.env.REACT_APP_API}login`, { email, password })
        .then((response) => {
          // Successful login (HTTP 200)
          Cookies.set('token', response.data.token, { expires: 1 });
          Cookies.set('user_email', email, { expires: 1 });
          nav('/');
        })
        .catch((error) => {
          // Handle 401 and other errors
          if (error.response) {
            if (error.response.status === 401) {
              alert('Invalid credentials');
            } else {
              alert(`Login failed: ${error.response.statusText}`);
            }
          } else {
            alert('Network error or server not responding');
          }
          console.error('Error during login:', error);
        });
    } else {
      alert('Please enter both email and password');
    }
  };
  const skipLogin = async() => {
    const token = Cookies.get('token');

      if (!token) {
        return;
      }

      try {
        const response = await axios.post(`${process.env.REACT_APP_API}checkme`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          nav('/');
        }
      } catch (error) {
        console.error("Token check failed:", error);
      }
  }


  return (
    <div className="auth-page">
      <div className="auth-container" ref={formRef}>
        <div className="auth-header">
          <h2 ref={addToElementsRef}>Welcome Back</h2>
          <p ref={addToElementsRef}>Sign in to continue to your account</p>
        </div>
        <form className="auth-form" onSubmit={handleLogin} ref={formRef}>
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
              placeholder="Enter your password" 
              required
              onChange={(e) => setPassword(e.target.value)}
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