import React from 'react';
import { CalendarClock, ShieldCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ActionCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6 h-full">
      {/* Trainer Booking */}
      <div className="glass rounded-2xl p-6 border border-brand-cyan/20 relative overflow-hidden group hover:border-brand-cyan/50 transition-colors flex flex-col justify-between">
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-cyan/10 blur-2xl rounded-full group-hover:bg-brand-cyan/20 transition-all"></div>
        <div>
          <div className="w-12 h-12 bg-brand-cyan/20 rounded-xl flex items-center justify-center mb-4 border border-brand-cyan/30">
            <CalendarClock className="text-brand-cyan" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Book a Trainer</h3>
          <p className="text-sm text-text-secondary mb-6 relative z-10">Schedule your next 1-on-1 session with elite coaches to hit your goals faster.</p>
        </div>
        <Link to="/dashboard/trainers" className="flex items-center justify-between w-full mt-auto glass bg-white/5 hover:bg-white/10 border-white/10 px-4 py-3 rounded-xl transition-colors relative z-10">
          <span className="font-semibold text-white">Find Availability</span>
          <ChevronRight size={18} className="text-brand-cyan" />
        </Link>
      </div>

      {/* Membership Status */}
      <div className="glass rounded-2xl p-6 border border-brand-purple/20 relative overflow-hidden group hover:border-brand-purple/50 transition-colors flex flex-col justify-between">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-purple/10 blur-2xl rounded-full group-hover:bg-brand-purple/20 transition-all"></div>
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-purple/20 rounded-xl flex items-center justify-center border border-brand-purple/30">
              <ShieldCheck className="text-brand-purple" size={24} />
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded-md border border-emerald-500/30">
              Active
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">PRO Membership</h3>
          <p className="text-sm text-text-secondary mb-6 relative z-10">Renews automatically on <span className="text-white font-medium">May 15, 2026</span>.</p>
        </div>
        <Link to="/dashboard/membership" className="flex items-center justify-between w-full mt-auto bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-90 px-4 py-3 rounded-xl transition-opacity shadow-lg shadow-brand-purple/20 border border-brand-cyan/50 relative z-10">
          <span className="font-semibold text-white">Manage Subscription</span>
          <ChevronRight size={18} className="text-white" />
        </Link>
      </div>
    </div>
  );
};
