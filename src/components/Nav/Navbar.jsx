// components/Navbar.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import './Navbar.css';

const Navbar = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    anime({
      targets: navbarRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    });
  }, []);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          FinanceTrack<span>.</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/expenses" className="nav-link">Expenses</Link>
        </div>
        <div className="nav-buttons">
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;