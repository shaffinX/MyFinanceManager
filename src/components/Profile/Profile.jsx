// pages/Profile.jsx
import React, { useEffect, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiSave } from 'react-icons/fi';
import anime from 'animejs/lib/anime.es.js';
import './Profile.css';

const Profile = () => {
  const profileRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    anime({
      targets: profileRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
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
    <div className="profile-page" ref={profileRef}>
      <div className="page-header" ref={addToElementsRef}>
        <h1>My Profile</h1>
        <p>Update your personal information</p>
      </div>

      <div className="profile-content">
        <div className="profile-section card" ref={addToElementsRef}>
          <div className="profile-header">
            <div className="profile-avatar">
              <FiUser className="avatar-icon" />
            </div>
            <button className="btn btn-secondary">Change Avatar</button>
          </div>
        </div>

        <div className="profile-section card" ref={addToElementsRef}>
          <h3>Personal Information</h3>
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="fullname"
                  placeholder="Your full name"
                  defaultValue="John Doe"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  defaultValue="john.doe@example.com"
                />
              </div>
            </div>
            
            <div className="form-action">
              <button type="submit" className="btn btn-primary">
                <FiSave /> Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="profile-section card" ref={addToElementsRef}>
          <h3>Change Password</h3>
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="currentPassword"
                  placeholder="Your current password"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <div className="form-action">
              <button type="submit" className="btn btn-primary">
                <FiSave /> Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;