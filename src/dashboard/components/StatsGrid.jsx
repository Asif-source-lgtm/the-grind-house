import React from 'react';
import { Flame, Target, CalendarDays, Activity } from 'lucide-react';

const stats = [
  { title: 'Calories Burned', value: '2,450', unit: 'kcal', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { title: 'Active Plan', value: 'Hypertrophy', unit: 'Phase 2', icon: Target, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10', border: 'border-brand-cyan/20' },
  { title: "Today's Workout", value: 'Leg Day', unit: '60 min', icon: CalendarDays, color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20' },
  { title: 'Current BMI', value: '22.4', unit: 'Healthy', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.title} className="glass rounded-2xl p-6 border-white/5 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-text-secondary font-medium mb-1">{stat.title}</p>
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border`}>
              <stat.icon size={22} className={stat.color} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-1 rounded-md ${stat.bg} ${stat.color}`}>
              {stat.unit}
            </span>
          </div>
          <div className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full ${stat.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
        </div>
      ))}
    </div>
  );
};
export default StatsGrid;
