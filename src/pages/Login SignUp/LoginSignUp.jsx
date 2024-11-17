import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignUp.css";
import { FaUser, FaLock, FaEnvelope, FaRegAddressCard } from "react-icons/fa";

const LoginSignUp = () => {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    regNo: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          regNo: formData.regNo,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token); // Store the JWT token
        alert(result.message); // Show success message
        navigate("/home"); // Redirect to Home page
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          number: formData.number,
          regNo: formData.regNo,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // Show success message
        setIsActive(false); // Switch to login form after successful registration
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={`wrapper ${isActive ? "active" : ""}`}>
      <span className="rotate-bg"></span>
      <span className="rotate-bg2"></span>

      {/* Login Form */}
      <div className="form-box login">
        <h2 className="title animation" style={{ "--i": 0, "--j": 20 }}>
          Login
        </h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-box animation" style={{ "--i": 1, "--j": 21 }}>
            <input
              type="text"
              required
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
            />
            <label htmlFor="regNo">Reg. No.</label>
            <FaRegAddressCard className="icon" />
          </div>
          <div className="input-box animation" style={{ "--i": 2, "--j": 22 }}>
            <input
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <FaLock className="icon" />
          </div>
          {error && <p className="error">{error}</p>}
          <button
            type="submit"
            className="btn animation"
            style={{ "--i": 3, "--j": 23 }}
          >
            Login
          </button>
          <div className="linkTxt animation" style={{ "--i": 4, "--j": 24 }}>
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                onClick={handleRegisterClick}
                className="register-link"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Registration Form */}
      <div className="form-box register">
        <h2 className="title animation" style={{ "--i": 17, "--j": 0 }}>
          Sign Up
        </h2>
        <form onSubmit={handleRegisterSubmit}>
          <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
            <FaUser className="icon" />
          </div>
          <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
            <input
              type="number"
              required
              name="number"
              value={formData.number}
              onChange={handleChange}
            />
            <label htmlFor="number">Number</label>
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
            <input
              type="text"
              required
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
            />
            <label htmlFor="regNo">Reg. No.</label>
            <FaRegAddressCard className="icon" />
          </div>
          <div className="input-box animation" style={{ "--i": 21, "--j": 4 }}>
            <input
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <FaLock className="icon" />
          </div>
          {error && <p className="error">{error}</p>}
          <button
            type="submit"
            className="btn animation"
            style={{ "--i": 23, "--j": 6 }}
          >
            Sign Up
          </button>
          <div className="linkTxt animation" style={{ "--i": 24, "--j": 7 }}>
            <p>
              Already have an account?{" "}
              <a href="#" onClick={handleLoginClick} className="login-link">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp;
