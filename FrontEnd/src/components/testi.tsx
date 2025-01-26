import React from "react";
import "./testi.css";
import { useTranslation } from 'react-i18next';

export function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: "Aishwarya Priyadarshini",
      role: t('testimonials.roles.farmer'),
      feedback: t('testimonials.feedback1'),
    },
    {
      id: 2,
      name: "Samiksha Sahoo",
      role: t('testimonials.roles.teacher'),
      feedback: t('testimonials.feedback2'),
    },
    {
      id: 3,
      name: "Aditya Hota",
      role: t('testimonials.roles.farmer'),
      feedback: t('testimonials.feedback3'),
    },
  ];

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">{t('testimonials.title')}</h2>
      <p className="testimonials-subtitle">{t('testimonials.subtitle')}</p>
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <p className="testimonial-feedback">"{testimonial.feedback}"</p>
            <div className="testimonial-user">
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}