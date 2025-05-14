import React, { useState } from 'react';
import Navbar from './components/Nav/Navbar';
import Sidebar from './components/Nav/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import ExpenseList from './components/Expense/ExpenseList';
import AddExpense from './components/Expense/AddExpense';
import EditExpense from './components/Expense/EditExpense';
import BudgetManagement from './components/Budget/BudgetManagement';
import SavingsCalculation from './components/Savings/SavingsCalculation';
import CategoriesManagement from './components/Categories/CategoriesManagement';
import ReportsAnalytics from './components/Report/ReportsAnalytics';
import TipsAndArticles from './components/Tips/TipsAndArticles';
import DailyDressingTrends from './components/Dress/DailyDressingTrends'
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import {Routes, Route,useLocation} from 'react-router-dom';
function RoutesApp() {
    const [menu,setMenu]= useState(false);
    const handleMenuToggle = () => {
        setMenu(!menu);
    };
    const location = useLocation();
    const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app">
        {!hideLayout && <Navbar />}
        {!hideLayout && (
          <div id='menuButt'>
            {!menu ? (
              <TiThMenu style={{ color: 'black', fontSize: 40 }} onClick={handleMenuToggle} />
            ) : (
              <IoClose style={{ color: 'black', fontSize: 40 }} onClick={handleMenuToggle} />
            )}
          </div>
        )}
        <div className="content-container">
           {!hideLayout && <Sidebar menu={menu} />}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/expenses" element={<ExpenseList />} />
              <Route path="/expenses/add" element={<AddExpense />} />
              <Route path="/expenses/edit/:id" element={<EditExpense />} />
              <Route path="/budget" element={<BudgetManagement />} />
              <Route path="/savings" element={<SavingsCalculation />} />
              <Route path="/categories" element={<CategoriesManagement />} />
              <Route path="/reports" element={<ReportsAnalytics />} />
              <Route path="/tips-articles" element={<TipsAndArticles />} />
              <Route path="/dressing-trends" element={<DailyDressingTrends />} />
            </Routes>
          </main>
        </div>
    </div>
  )
}

export default RoutesApp
