// components/Sidebar.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  RiDashboardLine, 
  RiMoneyDollarCircleLine,
  RiUser3Line,
  RiLogoutBoxLine,
  RiSettings4Line,
  RiAddCircleLine,
  RiArchiveDrawerLine
} from 'react-icons/ri';
import { FaMoneyBillWave,FaPiggyBank  } from "react-icons/fa";
import anime from 'animejs/lib/anime.es.js';
import './Sidebar.css';
import { MdOutlineCategory,MdOutlineTipsAndUpdates  } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    anime({
      targets: sidebarRef.current,
      translateX: [-250, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    });

    anime({
      targets: linksRef.current,
      translateX: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, {start: 300}),
      easing: 'easeOutExpo'
    });
  }, []);

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  return (
    <div className="sidebar" ref={sidebarRef}>
      <div className="sidebar-header">
        <h3>FinanceTrack</h3>
      </div>
      <div className="sidebar-menu">
        <Link to="/" className="menu-item" ref={addToLinksRef}>
          <RiDashboardLine className="menu-icon" />
          <span>Dashboard</span>
        </Link>
        <Link to="/expenses" className="menu-item" ref={addToLinksRef}>
          <RiMoneyDollarCircleLine className="menu-icon" />
          <span>Expenses</span>
        </Link>
        <Link to="/expenses/add" className="menu-item" ref={addToLinksRef}>
          <RiAddCircleLine className="menu-icon" />
          <span>Add Expense</span>
        </Link>
        <Link to="/profile" className="menu-item" ref={addToLinksRef}>
          <RiUser3Line className="menu-icon" />
          <span>Profile</span>
        </Link>
        <Link to="/settings" className="menu-item" ref={addToLinksRef}>
          <RiSettings4Line className="menu-icon" />
          <span>Settings</span>
        </Link>
        <Link to="/budget" className="menu-item" ref={addToLinksRef}>
          <FaMoneyBillWave className="menu-icon" />
          <span>Budget</span>
        </Link>
        <Link to="/savings" className="menu-item" ref={addToLinksRef}>
          <FaPiggyBank className="menu-icon"/>
          <span>Savings</span>
        </Link>
        <Link to="/categories" className="menu-item" ref={addToLinksRef}>
          <MdOutlineCategory className="menu-icon" />
          <span>Categories</span>
        </Link>
        <Link to="/reports" className="menu-item" ref={addToLinksRef}>
          <TbReportAnalytics className="menu-icon"/>
          <span>Reports</span>
        </Link>
        <Link to="/tips-articles" className="menu-item" ref={addToLinksRef}>
          <MdOutlineTipsAndUpdates  className="menu-icon" />
          <span>Tips & Articles</span>
        </Link>
        <Link to="/dressing-trends" className="menu-item" ref={addToLinksRef}>
          <RiArchiveDrawerLine className="menu-icon"/>
          <span>Dressing</span>
        </Link>
      </div>
      <div className="sidebar-footer">
        <Link to="/logout" className="menu-item" ref={addToLinksRef}>
          <RiLogoutBoxLine className="menu-icon" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;