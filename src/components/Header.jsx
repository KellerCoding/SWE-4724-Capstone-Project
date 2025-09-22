import React from 'react';
import './Header.css';

/*
ChatGPT code
*/
export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="logo">
          {/* Put logo image or text */}
          <h1>MyBrand</h1>
        </div>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item"><a href="#features">Features</a></li>
            <li className="nav__item"><a href="#about">About</a></li>
            <li className="nav__item"><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="header__cta">
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </header>
  );
}