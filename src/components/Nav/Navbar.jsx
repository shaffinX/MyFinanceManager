// components/Navbar.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import './Navbar.css';
import logo from '../../logo.svg'
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
          <img src={logo} alt="Logo" className="logo-image" width={50}/>
          CapitalCore<span>.</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/expenses" className="nav-link">Expenses</Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;