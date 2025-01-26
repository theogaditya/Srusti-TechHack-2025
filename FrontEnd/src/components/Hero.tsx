import React from "react";
import "./Hero.css";
import heroimg from "../assets/heroimg.jpeg";
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero-container">
      <div className="hero-bg">
        <img
          src={heroimg}
          alt="Hero Background"
          className="hero-image"
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">{t('welcome')}</h1>
        <p className="hero-subtitle">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
}