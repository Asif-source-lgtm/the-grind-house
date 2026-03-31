import React from 'react';
import { Dumbbell, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="nav-logo">
            <Dumbbell className="logo-icon" size={32} />
            <span>THE GRIND <b>HOUSE</b></span>
          </div>
          <p>The premier training facility for those who demand excellence and result-driven environments.</p>
        </div>
        
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#testimonials">Member Stories</a></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>123 Iron Avenue, Fitness District</p>
          <p>info@thegrindhouse.com</p>
          <p>+91 98765 43210</p>
        </div>
        
        <div className="footer-social">
          <h4>Follow the Grind</h4>
          <div className="social-icons">
            <a href="#"><MapPin /></a>
            <a href="#"><Phone /></a>
            <a href="#"><Mail /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} The Grind House. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;
