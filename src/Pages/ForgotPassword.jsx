import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages css/ForgotPassword.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: enter email, 2: verify OTP, 3: reset password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [serverOtpToken, setServerOtpToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setServerOtpToken(data.token); // token used to verify OTP
        setStep(2);
        alert('OTP sent to email');
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, token: serverOtpToken }),
      });

      const data = await res.json();
      if (data.success) {
        setStep(3);
        alert('OTP verified, you can now reset your password');
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Password updated successfully');
        navigate('/login');
      } else {
        alert(data.message || 'Failed to reset password');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={sendOTP}>
          <p>Enter your registered email address:</p>
          <input
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={verifyOTP}>
          <p>Enter the OTP sent to your email:</p>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={resetPassword}>
          <p>Set your new password:</p>
          <input
            type="password"
            placeholder="New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
