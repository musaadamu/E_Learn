import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://backend-lms-render.onrender.com"
      : "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset instructions");
      }
      setMessage("Reset instructions have been sent to your email.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form forgot-password-form">
      <div className="branding">
        <h1>E-Learn</h1>
        <h2>Forgot Password</h2>
      </div>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Registered Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Instructions"}
        </button>
      </form>
      <div className="auth-links">
        <Link to="/login">Back to Login</Link>
        <span> | </span>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
