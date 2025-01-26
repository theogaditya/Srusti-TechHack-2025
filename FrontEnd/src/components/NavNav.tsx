import React from "react";
import "./NavNav.css"; 
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import logo from "../assets/logo.png";

export function NavNav() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng :any  ) => {
    i18n.changeLanguage(lng); 
    localStorage.setItem('language', lng); 
  };

  return (
    <header className="nav-container fixed-header">
      {/* Top bar */}
      <div className="top-bar">
        <div className="logo"> {/* Placeholder for logo */}
          <img src={logo} alt="Site Logo" />
        </div>
        <div className="language-selector">
  <button onClick={() => changeLanguage('en')}>English</button>
  <button onClick={() => changeLanguage('hi')}>हिंदी</button>
  <button onClick={() => changeLanguage('od')}>ଓଡ଼ିଆ</button>
</div>
        {/* <div className="language-selector">
          <label htmlFor="language">Change Language:</label>
          <select id="language" className="language-dropdown">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="od">Odia</option>
          </select>
        </div> */}
      </div>
    </header>
  );
}
