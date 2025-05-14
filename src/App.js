// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Sidebar from './components/Nav/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import ExpenseList from './components/Expense/ExpenseList';
import AddExpense from './components/Expense/AddExpense';
import EditExpense from './components/Expense/EditExpense';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/expenses" element={<ExpenseList />} />
              <Route path="/expenses/add" element={<AddExpense />} />
              <Route path="/expenses/edit/:id" element={<EditExpense />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;