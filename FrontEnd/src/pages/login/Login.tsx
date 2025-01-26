import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';

export function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError(t('login.errors.allFieldsRequired'));
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        
        // Decode the token to get user email
        const decoded: { email: string } = jwtDecode(data.token);
        localStorage.setItem("userEmail", decoded.email); // Store email
        
        alert(t('login.success'));
        navigate("/dashboard");
      } else {
        setError(data.msg || t('login.errors.failed'));
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError(t('login.errors.generic'));
    }
  };

  return (
    <div className="login-container">
      <h1>{t('login.title')}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">{t('login.email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('login.emailPlaceholder')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{t('login.password')}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t('login.passwordPlaceholder')}
            required
          />
        </div>
        <button type="submit" className="login-button">
          {t('login.button')}
        </button>
      </form>
      <p>
        {t('login.noAccount')}{" "}
        <span onClick={() => navigate("/signup")} className="signup-link">
          {t('login.signupLink')}
        </span>
      </p>
    </div>
  );
}