import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar flex w-full flex-row ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          <Dumbbell className="logo-icon" size={32} />
          <span>THE GRIND <b>HOUSE</b></span>
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'nav-links-open' : ''}`}>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)}>Programs</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          <Link to="/login" className="font-bold uppercase" onClick={() => setMobileMenuOpen(false)}>
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-primary nav-btn" onClick={() => setMobileMenuOpen(false)}>
            Join Now
          </Link>
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
