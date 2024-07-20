import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api.js";
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{display:"flex"}}>
          <button style={{marginRight:'5px'}} type="submit">Login</button>
          <button style={{marginLeft:'5px', background:'gray'}} onClick={()=>navigate('/register')}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
