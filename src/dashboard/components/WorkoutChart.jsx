import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', calories: 2100, volume: 4000 },
  { name: 'Tue', calories: 2400, volume: 5500 },
  { name: 'Wed', calories: 1800, volume: 0 },
  { name: 'Thu', calories: 2600, volume: 6200 },
  { name: 'Fri', calories: 2800, volume: 7000 },
  { name: 'Sat', calories: 2200, volume: 3000 },
  { name: 'Sun', calories: 1900, volume: 2000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-xl border-brand-cyan/30 shadow-lg shadow-black">
        <p className="font-bold text-white mb-2">{label}</p>
        <p className="text-sm text-brand-cyan">Calories: <span className="font-bold">{payload[0].value} kcal</span></p>
        <p className="text-sm text-brand-purple">Volume: <span className="font-bold">{payload[1].value} lbs</span></p>
      </div>
    );
  }
  return null;
};

const WorkoutChart = () => {
  return (
    <div className="glass rounded-2xl p-6 border-white/5 h-[400px] flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-brand-cyan/5 blur-[100px] rounded-full point-events-none"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h2 className="text-lg font-bold text-white">Workout Progress</h2>
          <p className="text-sm text-text-secondary">Calories burn vs Lifting volume</p>
        </div>
        <select className="bg-bg-dark border border-white/10 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-cyan">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>
      
      <div className="flex-1 relative z-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#a0a0a0" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#a0a0a0" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="volume" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
            <Area type="monotone" dataKey="calories" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorCalories)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default WorkoutChart;
