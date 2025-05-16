// pages/Profile.jsx
import React, { useEffect, useRef,useState } from 'react';
import {  FiSave } from 'react-icons/fi';
import anime from 'animejs/lib/anime.es.js';
import './Profile.css';
import { getUserProfile, saveUserProfile,ChangePassword } from './profilefnc';

const Profile = () => {
  const profileRef = useRef(null);
  const elementsRef = useRef([]);
   const fileInputRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const getter= async()=>{
    let data = await getUserProfile()
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setAvatar(data.avatar);
    }
    console.log(data);
  }
  const handleImagePicker = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getter()
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

  const SaveProfile= async () => {
    const response = await saveUserProfile(name,email,avatar);
    if (!response) {
      alert("Failed to update profile");
    }
  }
  const handlePasswordChange = async () => {
    const response = await ChangePassword(password, newPassword);
    if (!response) {
      alert("Failed to update password");
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
              <img src={avatar} alt='#' />
            </div>
            <button className="btn btn-secondary" onClick={handleImagePicker}>Change Avatar</button>
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="profile-section card" ref={addToElementsRef}>
          <h3>Personal Information</h3>
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <div className="input-group">
                <input
                  type="text"
                  id="fullname"
                  placeholder="Your full name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  placeholder="Your email address"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-action">
              <button type="submit" className="btn btn-primary" onClick={(e) => {SaveProfile();e.preventDefault()}}>
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
                <input
                  type="password"
                  id="currentPassword"
                  placeholder="Your current password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-group">
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="form-action">
              <button type="submit" className="btn btn-primary" onClick={(e) => {handlePasswordChange();e.preventDefault()}}>
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