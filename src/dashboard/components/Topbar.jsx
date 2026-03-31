import React from 'react';
import { Search, Bell, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-6 lg:px-8 relative z-20">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-text-secondary hover:text-white transition-colors">
          <Menu size={24} />
        </button>
        
        <div className="hidden md:flex items-center glass rounded-full px-4 py-2 border border-white/10 w-72 focus-within:border-brand-cyan/50 focus-within:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all">
          <Search size={18} className="text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search workouts, trainers..." 
            className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-text-secondary text-white"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="p-2 rounded-full glass hover:bg-white/10 transition-colors relative">
            <Bell size={20} className="text-text-secondary hover:text-white transition-colors" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-cyan rounded-full border border-bg-dark"></span>
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10 group relative">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">{user?.name || 'Athlete'}</p>
            <button onClick={logout} className="text-xs font-semibold text-brand-purple hover:text-red-500 transition-colors uppercase flex items-center justify-end gap-1 w-full"><LogOut size={12}/> Logout</button>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-brand-cyan/50 overflow-hidden shadow-lg shadow-brand-cyan/20">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Topbar;
