import React, { useState } from 'react';
import { createPassword } from '../api.js';
import { useNavigate } from 'react-router-dom';
import './AddPasswordForm.jsx'

const AddPasswordForm = () => {
  const [formData, setFormData] = useState({ title: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPassword(formData);
      navigate('/');
    } catch (error) {
      console.error('Error creating password', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Add Password</h2>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Add Password</button>
      </form>
    </div>
  );
};

export default AddPasswordForm;

