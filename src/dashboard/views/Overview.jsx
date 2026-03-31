import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StatsGrid from '../components/StatsGrid';
import WorkoutChart from '../components/WorkoutChart';
import { ActionCards } from '../components/ActionCards';

const Overview = () => {
  const { user } = useAuth();

  return (
    <div className="pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-1">DASHBOARD</h1>
          <p className="text-text-secondary">Welcome back, {user?.name || 'Athlete'}. Keep up the grind.</p>
        </div>
        <button className="hidden sm:block px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
          Download Report
        </button>
      </div>
      
      <StatsGrid />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <WorkoutChart />
        </div>
        <div className="xl:col-span-1">
          <ActionCards />
        </div>
      </div>
    </div>
  );
};
export default Overview;
