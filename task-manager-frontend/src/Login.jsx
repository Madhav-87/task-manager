import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";
function Login() {
  const navigate=useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
 
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        user
      );

      navigate('/home');
      localStorage.setItem("token",res.data.userToken);
    } catch (err) {
      if(err.response){
        toast.error(err.response.data.message || "Server Error ⚠️");
      }
      else if(err.request){
        toast.error("No response from server ⚠️");
      }
      else{
        toast.error("Something went wrong ⚠️");
      }
    }
  };

  return (
    <div className="login-container">
      <ToastContainer/>
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="footer-text">
          Don't have an account? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;