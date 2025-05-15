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
import { FaMoneyBillWave, FaPiggyBank } from "react-icons/fa";
import anime from 'animejs/lib/anime.es.js';
import './Sidebar.css';
import { MdOutlineCategory, MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import MediaQuery from 'react-responsive';
import { TiThMenu } from "react-icons/ti";
import Cookies from 'js-cookie';

const Sidebar = ({menu}) => {
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
      delay: anime.stagger(100, { start: 300 }),
      easing: 'easeOutExpo'
    });
  }, [menu]);

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user_email');
    window.location.href = '/login';
  }

  return (
    <React.Fragment>
      <MediaQuery minWidth={769}>
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
            {/* <Link to="/settings" className="menu-item" ref={addToLinksRef}>
              <RiSettings4Line className="menu-icon" />
              <span>Settings</span>
            </Link> */}
            <Link to="/budget" className="menu-item" ref={addToLinksRef}>
              <FaMoneyBillWave className="menu-icon" />
              <span>Budget</span>
            </Link>
            <Link to="/savings" className="menu-item" ref={addToLinksRef}>
              <FaPiggyBank className="menu-icon" />
              <span>Savings</span>
            </Link>
            <Link to="/categories" className="menu-item" ref={addToLinksRef}>
              <MdOutlineCategory className="menu-icon" />
              <span>Categories</span>
            </Link>
            <Link to="/reports" className="menu-item" ref={addToLinksRef}>
              <TbReportAnalytics className="menu-icon" />
              <span>Reports</span>
            </Link>
            <Link to="/tips-articles" className="menu-item" ref={addToLinksRef}>
              <MdOutlineTipsAndUpdates className="menu-icon" />
              <span>Tips & Articles</span>
            </Link>
            <Link to="/dressing-trends" className="menu-item" ref={addToLinksRef}>
              <RiArchiveDrawerLine className="menu-icon" />
              <span>Dressing</span>
            </Link>
          </div>
          <div className="sidebar-footer">
            <Link to="/logout" className="menu-item" ref={addToLinksRef} onClick={handleLogout}>
              <RiLogoutBoxLine className="menu-icon" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        <div className="sidebar" ref={sidebarRef} style={menu?{display:'block'}:{display:'none'}}>
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
            {/* <Link to="/settings" className="menu-item" ref={addToLinksRef}>
              <RiSettings4Line className="menu-icon" />
              <span>Settings</span>
            </Link> */}
            <Link to="/budget" className="menu-item" ref={addToLinksRef}>
              <FaMoneyBillWave className="menu-icon" />
              <span>Budget</span>
            </Link>
            <Link to="/savings" className="menu-item" ref={addToLinksRef}>
              <FaPiggyBank className="menu-icon" />
              <span>Savings</span>
            </Link>
            <Link to="/categories" className="menu-item" ref={addToLinksRef}>
              <MdOutlineCategory className="menu-icon" />
              <span>Categories</span>
            </Link>
            <Link to="/reports" className="menu-item" ref={addToLinksRef}>
              <TbReportAnalytics className="menu-icon" />
              <span>Reports</span>
            </Link>
            <Link to="/tips-articles" className="menu-item" ref={addToLinksRef}>
              <MdOutlineTipsAndUpdates className="menu-icon" />
              <span>Tips & Articles</span>
            </Link>
            <Link to="/dressing-trends" className="menu-item" ref={addToLinksRef}>
              <RiArchiveDrawerLine className="menu-icon" />
              <span>Dressing</span>
            </Link>
          </div>
          <div className="sidebar-footer">
            <Link to="/logout" className="menu-item" ref={addToLinksRef} onClick={handleLogout}>
              <RiLogoutBoxLine className="menu-icon" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
        
      </MediaQuery>
    </React.Fragment>
  );
};

export default Sidebar;