import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api.js';
import './RegisterForm.css'

const RegisterForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      navigate('/login');
    } catch (error) {
      console.error('Error registering', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <div style={{display:"flex"}}>
          <button style={{marginRight:'5px'}} type="submit">Register</button>
          <button style={{marginLeft:'5px', background:'gray'}} onClick={()=>navigate('/login')}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

