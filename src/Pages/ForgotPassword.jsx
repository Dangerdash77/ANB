import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages css/ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleOTP = (e) => {
    e.preventDefault();
    // Verify OTP here
    navigate('/reset-password');
  };

  return (
    <div className="forgot-container">
      <h2>OTP Verification</h2>
      <p>Enter the 6-digit OTP sent to your registered mobile number.</p>
      <form onSubmit={handleOTP}>
        <input type="number" maxLength={6} pattern="\d{6}" placeholder="Enter OTP" required />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
