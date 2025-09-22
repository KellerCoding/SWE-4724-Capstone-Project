import React from 'react';
import './Hero.css';

/*
ChatGPT code
*/
export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__content">
        <div className="hero__text">
          <h2>Your Solution Title Here</h2>
          <p>Brief description that summarizes the value proposition. Make it punchy and clear.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div className="hero__image">
          {/* Put hero image here */}
          <img src="/path/to/hero-image.png" alt="Hero illustration" />
        </div>
      </div>
    </section>
  );
}