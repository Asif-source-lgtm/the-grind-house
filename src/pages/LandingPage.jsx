import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import Trainers from '../components/Trainers';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg-dark font-sans text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <Trainers />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
