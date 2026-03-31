import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <h2 className="section-title">Membership <span>Plans</span></h2>
        <p className="section-subtitle">No hidden fees. Just raw iron and results. Choose your path to greatness.</p>
        
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-header">
              <h3>Monthly Grind</h3>
            </div>
            <div className="pricing-price">
              <span className="currency">₹</span>
              <span className="amount">1,000</span>
              <span className="period">/mo</span>
            </div>
            <ul className="pricing-features">
              <li><Check className="check-icon" size={18} /> Full gym access</li>
              <li><Check className="check-icon" size={18} /> Locker room & showers</li>
              <li><Check className="check-icon" size={18} /> Free weights & machines</li>
              <li><Check className="check-icon" size={18} /> 1 Guest pass per month</li>
            </ul>
            <Link to="/signup" className="btn btn-outline" style={{width: '100%', display: 'inline-block', textAlign: 'center'}}>Select Plan</Link>
          </div>
          
          <div className="pricing-card featured">
            <div className="featured-badge">Most Popular</div>
            <div className="pricing-header">
              <h3>Yearly Commitment</h3>
            </div>
            <div className="pricing-price">
              <span className="currency">₹</span>
              <span className="amount">12,000</span>
              <span className="period">/yr</span>
            </div>
            <ul className="pricing-features">
              <li><Check className="check-icon" size={18} /> Everything in Monthly</li>
              <li><Check className="check-icon" size={18} /> 2 Free personal training sessions</li>
              <li><Check className="check-icon" size={18} /> Nutrition guide</li>
              <li><Check className="check-icon" size={18} /> Unlimited guest passes (weekends)</li>
              <li><Check className="check-icon" size={18} /> The Grind House Merch</li>
            </ul>
            <Link to="/signup" className="btn btn-primary" style={{width: '100%', display: 'inline-block', textAlign: 'center'}}>Commit Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
