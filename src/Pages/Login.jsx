import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages css/Login.css';

function Login({ setIsLoggedIn = () => {}, setRole = () => {} }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://anb-nuis.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Set login state in App
        setIsLoggedIn(true);
        setRole(data.role);

        // Save login state to localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', data.role);

        // Redirect based on role
        switch (data.role) {
          case 'owner':
            navigate('/company');
            break;
          case 'manager':
            navigate('/manager/tasks');
            break;
          case 'employee':
            navigate('/employee/tasks');
            break;
          default:
            navigate('/');
        }
      } else {
        alert('Invalid credentials');
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
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
