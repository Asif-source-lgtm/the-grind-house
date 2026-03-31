import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Users, CreditCard, Settings, Dumbbell } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', end: true },
    { name: 'Workouts', icon: Activity, path: '/dashboard/workouts' },
    { name: 'Trainers', icon: Users, path: '/dashboard/trainers' },
    { name: 'Membership', icon: CreditCard, path: '/dashboard/membership' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <aside className="w-68 glass hidden lg:flex flex-col border-r border-white/5 relative z-20 shadow-2xl shadow-brand-purple-glow/10">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center shadow-lg shadow-brand-cyan-glow">
          <Dumbbell className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-wider">THE <span className="text-gradient">GRIND</span></h1>
      </div>
      
      <nav className="flex-1 px-4 mt-6 flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
              isActive 
                ? 'bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 text-white border border-brand-cyan/30 shadow-lg shadow-brand-cyan/10'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-brand-cyan' : 'text-text-secondary'} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-6 mt-auto">
        <div className="glass rounded-2xl p-5 text-center border border-brand-purple/20 relative overflow-hidden group hover:border-brand-purple/40 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-purple/30 transition-all"></div>
          <h4 className="font-bold text-sm mb-1 relative z-10">PRO Membership</h4>
          <p className="text-xs text-text-secondary mb-4 relative z-10">Unlock all training analytics.</p>
          <button className="relative z-10 w-full py-2 rounded-lg bg-gradient-to-r from-brand-cyan to-brand-purple text-sm font-bold shadow-lg shadow-brand-purple/25 hover:opacity-90 transition-opacity">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
