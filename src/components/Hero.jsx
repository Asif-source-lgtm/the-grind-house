import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src="/hero_bg.png" alt="The Grind House Gym" />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <h1 className="hero-title animate-fade-in delay-1">
          Forge Your <span>Legacy</span>
        </h1>
        <p className="hero-subtitle animate-fade-in delay-2">
          Step into The Grind House. Premium equipment, elite atmosphere, and a community built on raw grit.
        </p>
        <div className="hero-actions animate-fade-in delay-3">
          <Link to="/signup" className="btn btn-primary">
            Start Grinding <ArrowRight size={20} />
          </Link>
          <a href="#programs" className="btn btn-outline">
            View Programs
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
