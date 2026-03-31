import React from 'react';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <h2 className="section-title">Member <span>Stories</span></h2>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <Quote className="quote-icon" size={40} />
            <p className="testimonial-text">"Before The Grind House, I bounced from gym to gym. Once I stepped in here, the raw atmosphere and top-tier equipment hooked me. It's my second home."</p>
            <div className="testimonial-author">
              <div className="author-avatar sr-only"></div>
              <div>
                <h4>Rahul Sharma</h4>
                <p>Powerlifter</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <Quote className="quote-icon" size={40} />
            <p className="testimonial-text">"The personal trainers are arguably the best in the city. Within 6 months, my transformation was unbelievable. The focus here is strictly on results."</p>
            <div className="testimonial-author">
              <div className="author-avatar sr-only"></div>
              <div>
                <h4>Priya Patel</h4>
                <p>Fat loss journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
