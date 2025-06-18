
// src/Pages/Profile.jsx
import React, { useState } from 'react';
import './Pages css/Profile.css';

const Profile = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  return (
    <div className="profile-container">
      <div className="profile-pic">
        <img
          src={photo || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-img"
        />
        <input type="file" onChange={handlePhotoUpload} />
      </div>
      <div className="profile-details">
        <h2>John Doe</h2>
        <p>Email: john.doe@example.com</p>
        <p>Role: Owner</p>
      </div>
      <div className="change-password">
        <h3>Change Password</h3>
        <input type="password" placeholder="New Password" />
        <input type="password" placeholder="Confirm Password" />
        <button>Submit</button>
      </div>
    </div>
  );
};

export default Profile;
