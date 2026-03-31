import React from 'react';
import { Dumbbell, Activity, HeartPulse } from 'lucide-react';
import './Programs.css';

const Programs = () => {
  return (
    <section id="programs" className="section programs">
      <div className="container">
        <h2 className="section-title">Elite <span>Training</span></h2>
        <p className="section-subtitle">Push your limits with our specialized training zones designed for maximum results.</p>
        
        <div className="programs-grid">
          <div className="program-card">
            <div className="card-bg">
              <img src="/strength_bg.png" alt="Strength" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <Dumbbell className="program-icon" size={40} />
              <h3>Strength Grinding</h3>
              <p>Powerlifting racks, Olympic plates, and dumbbells up to 150 lbs for raw power development.</p>
            </div>
          </div>
          
          <div className="program-card">
            <div className="card-bg">
              <img src="/cardio_bg.png" alt="Cardio" />
              <div className="card-overlay"></div>
            </div>
            <div className="card-content">
              <Activity className="program-icon" size={40} />
              <h3>High Intensity</h3>
              <p>Top-tier treadmills, stair climbers, and rowers for ultimate cardiovascular conditioning.</p>
            </div>
          </div>
          
          <div className="program-card bg-solid">
            <div className="card-content">
              <HeartPulse className="program-icon" size={40} />
              <h3>Personal Training</h3>
              <p>Work 1-on-1 with elite coaches to shatter your plateaus and reach new personal records.</p>
              <a href="#pricing" className="btn btn-outline" style={{marginTop: '1.5rem', width: '100%'}}>More Info</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Programs;
