import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useTranslation } from 'react-i18next';

export function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError(t('signup.errors.allFieldsRequired'));
      return;
    }

    if (formData.password.length < 7) {
      setError(t('signup.errors.passwordLength'));
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(t('signup.success'));
        navigate("/login");
      } else {
        setError(data.msg || t('signup.errors.failed'));
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError(t('signup.errors.generic'));
    }
  };

  return (
    <div className="signup-container">
      <h1>{t('signup.title')}</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">{t('signup.username')}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder={t('signup.usernamePlaceholder')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">{t('signup.email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('signup.emailPlaceholder')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{t('signup.password')}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t('signup.passwordPlaceholder')}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          {t('signup.button')}
        </button>
      </form>
      <p>
        {t('signup.haveAccount')}{" "}
        <span onClick={() => navigate("/login")} className="login-link">
          {t('signup.loginLink')}
        </span>
      </p>
    </div>
  );
}