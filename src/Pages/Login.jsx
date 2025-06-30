import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages css/Login.css';

function Login({ setIsLoggedIn = () => {}, setRole = () => {} }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("API:", import.meta.env.VITE_SERVER_ORIGIN); 
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(true);
        setRole(data.role || 'user');

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', data.role || 'user');

        // Navigate by role
        if (data.role === 'owner') navigate('/company');
        else if (data.role === 'manager') navigate('/manager/tasks');
        else if (data.role === 'employee') navigate('/employee/tasks');
        else navigate('/profile');
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username}
               onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p><a href="/forgot-password">Forgot Password?</a></p>
        <p>New user? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
}

export default Login;
