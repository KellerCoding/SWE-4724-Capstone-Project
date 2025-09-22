import React from 'react';
import './Features.css';

/*
ChatGPT code
*/
const featuresData = [
  {
    title: 'Feature One',
    description: 'Description for feature one. What makes it great.',
    icon: '/icons/feature1.svg'
  },
  {
    title: 'Feature Two',
    description: 'Description for feature two. Benefits etc.',
    icon: '/icons/feature2.svg'
  },
  {
    title: 'Feature Three',
    description: 'Description for feature three. Why it matters.',
    icon: '/icons/feature3.svg'
  }
];

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="container features__grid">
        {featuresData.map((f, idx) => (
          <div key={idx} className="feature">
            <img src={f.icon} alt={`${f.title} icon`} className="feature__icon" />
            <h3 className="feature__title">{f.title}</h3>
            <p className="feature__desc">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
