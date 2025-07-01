import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages css/Login.css';

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log(`${import.meta.env.VITE_SERVER_ORIGIN}/api/users/signup`)
      const data = await res.json();
      if (data.success) {
        alert('✅ Signup successful! Please login.');
        navigate('/login');
      } else {
        alert(data.message || '❌ Signup failed.');
      }
    } catch (err) {
      console.error(err);
      alert('🚫 Server error. Try again later.'+ err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}

export default Signup;
