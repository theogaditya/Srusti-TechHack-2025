import React from "react";
import "./Footer.css";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="social-links">
          <a href="#" className="social-icon">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="#" className="social-icon">
            <img src={twitter} alt="Twitter" />
          </a>
          <a href="#" className="social-icon">
            <img src={instagram} alt="Instagram" />
          </a>
        </div>
        <div className="quick-links">
          <a href="#about" className="footer-button">{t('about')}</a>   
          <a href="#privacy" className="footer-button">{t('privacy')}</a>
          <a href="#terms" className="footer-button">{t('terms')}</a>
          <a href="#contact" className="footer-button">{t('contact')}</a>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Primeagen Complaint Portal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}