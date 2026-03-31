import React from 'react';
import { CreditCard, ShieldCheck, Download, CheckCircle2, Plus, Receipt, Zap } from 'lucide-react';

const Membership = () => {
  const currentPlan = {
    name: 'Yearly Commitment',
    type: 'Elite PRO',
    price: '₹12,000',
    cycle: 'yearly',
    renewalDate: 'Jan 15, 2027',
    status: 'Active',
    metrics: [
      { label: 'Guest Passes', value: 'Unlimited', icon: ShieldCheck },
      { label: 'Free PT Sessions', value: '2 Remaining', icon: CheckCircle2 },
      { label: 'Locker Rental', value: 'Active (Premium)', icon: Zap }
    ]
  };

  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', exp: '12/28', isDefault: true, color: 'from-blue-700 to-indigo-900' }
  ];

  const billingHistory = [
    { id: 'INV-2026-001', date: 'Jan 15, 2026', desc: 'Annual Gym Membership Renewal', amount: '₹12,000', status: 'Paid' },
    { id: 'INV-2025-012', date: 'Dec 05, 2025', desc: 'The Grind House Merch - Heavyweight Hoodie', amount: '₹2,500', status: 'Paid' },
    { id: 'INV-2025-001', date: 'Jan 15, 2025', desc: 'Annual Gym Membership Renewal', amount: '₹12,000', status: 'Paid' },
  ];

  return (
    <div className="pb-10 font-sans">
      <div className="flex justify-between items-end mb-8 relative z-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-1 uppercase">Membership</h1>
          <p className="text-text-secondary">Manage your subscription, billing, and gym perks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
        {/* Active Plan Card */}
        <div className="xl:col-span-2 glass rounded-[2rem] p-8 border border-white/10 relative overflow-hidden group shadow-2xl shadow-black/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-brand-cyan/20 transition-all"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative z-10 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                 <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-3 py-1.5 rounded-md tracking-widest uppercase">
                   {currentPlan.status}
                 </span>
                 <p className="text-brand-cyan font-bold tracking-widest text-xs uppercase">{currentPlan.type}</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">{currentPlan.name}</h2>
              <p className="text-text-secondary text-sm">Next billing cycle: <span className="text-white font-semibold">{currentPlan.renewalDate}</span></p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-5xl font-black text-white">{currentPlan.price}<span className="text-xl text-text-secondary font-medium tracking-normal">/{currentPlan.cycle === 'yearly' ? 'yr' : 'mo'}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 relative z-10">
            {currentPlan.metrics.map((metric, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center gap-4 hover:border-white/10 transition-colors">
                 <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-tr from-brand-cyan/10 to-brand-purple/10 flex items-center justify-center border border-white/10">
                   <metric.icon className="text-white" size={20} />
                 </div>
                 <div>
                   <p className="text-[10px] text-brand-cyan uppercase font-bold tracking-wider mb-0.5">{metric.label}</p>
                   <p className="text-sm font-bold text-white leading-tight">{metric.value}</p>
                 </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 border-t border-white/5 pt-8">
            <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-90 text-sm font-black shadow-lg shadow-brand-cyan/20 text-white transition-all text-center tracking-wide">
              Upgrade Plan
            </button>
            <button className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold text-white transition-colors text-center tracking-wide">
              Manage Subscription
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="glass rounded-[2rem] p-8 border border-white/10 relative overflow-hidden flex flex-col h-full shadow-2xl shadow-black/40">
           <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-purple/10 blur-[80px] rounded-full pointer-events-none"></div>
           <div className="relative z-10 flex-1">
             <h3 className="text-xl font-bold text-white mb-6 tracking-wide flex items-center gap-2">Payment Methods</h3>
             {paymentMethods.map(pm => (
               <div key={pm.id} className={`w-full h-44 rounded-2xl bg-gradient-to-tr ${pm.color} p-6 relative overflow-hidden shadow-[0_10px_30px_rgba(29,78,216,0.3)] mb-5 border border-white/20 transform hover:-translate-y-1 transition-transform`}>
                 <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full blur-[30px] translate-y-1/2 -translate-x-1/2"></div>
                 <div className="flex justify-between items-start relative z-10">
                   <CreditCard className="text-white" size={36} />
                   {pm.isDefault && (
                     <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-lg border border-white/10">DEFAULT</span>
                   )}
                 </div>
                 <div className="absolute bottom-6 left-6 right-6 z-10">
                   <p className="text-white/70 text-[10px] mb-1.5 uppercase font-bold tracking-[0.2em]">{pm.type}</p>
                   <div className="flex justify-between items-end">
                     <p className="text-xl font-black text-white tracking-[0.25em] drop-shadow-md">•••• {pm.last4}</p>
                     <p className="text-white font-semibold text-sm drop-shadow-md tracking-wider">{pm.exp}</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>
           
           <button className="w-full py-4 rounded-xl border-2 border-dashed border-white/10 hover:border-brand-cyan/50 hover:bg-brand-cyan/5 text-sm font-bold text-text-secondary hover:text-white transition-all flex items-center justify-center gap-2 mt-auto relative z-10">
             <Plus size={18} /> Add Payment Method
           </button>
        </div>
      </div>

      {/* Billing History (Glassmorphism List Cards) */}
      <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-wide">
        <Receipt size={24} className="text-brand-purple" /> Billing History
      </h3>
      <div className="flex flex-col gap-4 relative z-10">
        {billingHistory.map((invoice) => (
          <div key={invoice.id} className="glass rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group shadow-lg shadow-black/20">
             <div className="flex items-center gap-5 w-full md:w-auto">
               <div className="w-14 h-14 shrink-0 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/20 group-hover:border-brand-purple/30 transition-all shadow-inner">
                 <Receipt size={24} className="text-text-secondary group-hover:text-white transition-colors" />
               </div>
               <div className="flex-1">
                 <h4 className="text-white font-bold text-lg leading-tight mb-1.5">{invoice.desc}</h4>
                 <div className="flex items-center flex-wrap gap-2 md:gap-3 text-[11px] text-text-secondary font-medium">
                   <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">{invoice.date}</span>
                   <span className="w-1 h-1 rounded-full bg-white/20 hidden md:block"></span>
                   <span className="uppercase tracking-widest">{invoice.id}</span>
                 </div>
               </div>
             </div>
             
             <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-8 border-t border-white/5 pt-5 md:border-0 md:pt-0">
                <div className="text-left md:text-right">
                  <p className="text-xl font-black text-white tracking-wide">{invoice.amount}</p>
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">{invoice.status}</p>
                </div>
                <button className="w-12 h-12 rounded-full glass bg-white/5 flex items-center justify-center hover:bg-brand-cyan/20 hover:border-brand-cyan/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] border border-white/10 transition-all group/btn">
                  <Download size={20} className="text-white group-hover/btn:text-brand-cyan group-hover/btn:-translate-y-1 transition-all duration-300" />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
