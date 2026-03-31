import React from 'react';

const trainers = [
  {
    name: 'Marcus Vance',
    specialty: 'Powerlifting / Strength',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
    bio: 'Former competitive powerlifter focused on raw strength and perfect biomechanics.'
  },
  {
    name: 'Elena Rostova',
    specialty: 'Athletic Conditioning',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop',
    bio: 'Elite sprint coach specializing in fast-twitch explosive movements and agility.'
  },
  {
    name: 'David Chen',
    specialty: 'Hypertrophy / Aesthetics',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    bio: 'Bodybuilding expert dedicated to muscle isolation and aesthetic sculpting.'
  }
];

const Trainers = () => {
  return (
    <section className="py-24 bg-bg-dark relative overflow-hidden font-sans border-y border-white/5" id="trainers">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 w-full" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">Elite</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg font-medium">
            Train under the guidance of industry-leading professionals who push boundaries and forge champions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div key={trainer.name} className="group relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-brand-cyan/50 transition-colors duration-500 h-[28rem] flex">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent z-10"></div>
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
              </div>
              
              <div className="relative z-20 mt-auto p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-brand-cyan font-bold text-xs tracking-wider uppercase mb-2">{trainer.specialty}</p>
                <h3 className="text-2xl font-bold text-white mb-3">{trainer.name}</h3>
                <p className="text-text-secondary text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{trainer.bio}</p>
                <div className="w-16 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
