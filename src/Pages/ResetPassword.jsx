import React from 'react';
import './Pages css/ResetPassword.css';

const ResetPassword = () => {
  const handleReset = (e) => {
    e.preventDefault();
    // Reset password logic here
    alert('Password reset successfully!');
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input type="password" placeholder="New Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;
