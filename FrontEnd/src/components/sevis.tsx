import React from "react";
import "./sevis.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'; // Import useTranslation

export function RegisterSection() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <section className="register-section">
      <div className="register-content">
        <h2 className="register-title">{t('registerComplaint')}</h2>
        <p className="register-description">
          {t('registerDescription')}
        </p>
        <div className="register-buttons">
          <button
            onClick={() => navigate("/login")}
            className="register-button main-login-button"
          >
            {t('mainlogin')}
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="register-button main-signup-button"
          >
            {t('mainsignup')}
          </button>
        </div>
      </div>
    </section>
  );
}