// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Products from './Pages/Products';
import Home from './Pages/Home';
import Career from './Pages/Career';
import Login from './Pages/Login';
import RoleEditor from './Pages/RoleEditor';
import Signup from './Pages/Signup';
import Company from './Pages/Company';
import Inventory from './Pages/Inventory';
import PrintBill from './Pages/PrintBill';
import Contact from './Pages/Contact';
import AboutUs from './Pages/AboutUs';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Profile from './Pages/Profile';
import ManageProducts from './Pages/ManageProducts';
import CareerRequests from './Pages/CareerRequests';
import ContactRequests from './Pages/ContactRequests';

import './App.css';

const PrivateRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return element;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [role, setRole] = useState(localStorage.getItem('userRole') || '');

  // ✅ Define handleLogout above return
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setRole('');
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} role={role} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
        <Route path="/edit-roles" element={<PrivateRoute allowedRoles={['owner']} element={<RoleEditor />} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/company" element={<PrivateRoute allowedRoles={['user', 'owner', 'manager', 'employee']} element={<Company />} />} />
        <Route path="/inventory" element={<PrivateRoute allowedRoles={['user', 'owner', 'manager', 'employee']} element={<Inventory />} />} />
        <Route path="/printbill" element={<PrivateRoute allowedRoles={['user', 'owner', 'manager', 'employee']} element={<PrintBill />} />} />
        <Route path="/profile" element={<PrivateRoute allowedRoles={['user', 'owner', 'manager', 'employee']} element={<Profile />} />} />
        <Route path="/manage-products" element={<PrivateRoute allowedRoles={['owner']} element={<ManageProducts />} />} />
        <Route path="/view-careers" element={<PrivateRoute allowedRoles={['owner']} element={<CareerRequests />} />} />
        <Route path="/view-contacts" element={<PrivateRoute allowedRoles={['owner']} element={<ContactRequests />} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
