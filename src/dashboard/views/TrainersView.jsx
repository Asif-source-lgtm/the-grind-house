import React, { useState, useEffect } from 'react';
import { Search, CalendarDays, Clock, MapPin, X, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { api } from '../../utils/api';

const getToken = () => localStorage.getItem('gym_jwt_token');

const TrainersView = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [upcomingBooking, setUpcomingBooking] = useState(null);

  // Fetch trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch(api(`/api/trainers?search=${searchTerm}`), {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const data = await res.json();
        if (data.success) setTrainers(data.trainers);
      } catch (err) {
        console.error('Failed to fetch trainers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [searchTerm]);

  // Fetch user bookings for the banner
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(api('/api/trainers/bookings'), {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        const data = await res.json();
        if (data.success && data.bookings.length > 0) {
          setUpcomingBooking(data.bookings[0]);
        }
      } catch (err) { /* silent */ }
    };
    fetchBookings();
  }, [bookingSuccess]);

  const openBookingModal = (trainer) => {
    setSelectedTrainer(trainer);
    setSlots(trainer.availableSlots || []);
    setSelectedDate(trainer.availableSlots?.[0]?.date || null);
    setSelectedSlot(null);
    setBookingSuccess(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setSelectedTrainer(null);
      setBookingSuccess(false);
    }, 300);
  };

  const handleBook = async () => {
    if (!selectedSlot || !selectedTrainer) return;
    setSubmitting(true);
    try {
      const res = await fetch(api('/api/trainers/bookings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ trainerId: selectedTrainer._id, date: selectedDate, time: selectedSlot })
      });
      const data = await res.json();
      if (data.success) {
        setBookingSuccess(true);
        setTimeout(() => closeModal(), 2500);
      }
    } catch (err) {
      console.error('Booking failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const currentSlotTimes = slots.find(s => s.date === selectedDate)?.times || [];

  return (
    <div className="pb-10 font-sans">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 relative z-10 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-1 uppercase">Trainers</h1>
          <p className="text-text-secondary">Find your coach and secure your next session.</p>
        </div>
        <div className="flex items-center glass rounded-xl px-4 py-2 border border-white/10 w-full md:w-80 focus-within:border-brand-purple/50 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
          <Search size={18} className="text-text-secondary" />
          <input type="text" placeholder="Search by name or specialty..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-text-secondary text-white" />
        </div>
      </div>

      {/* Upcoming booking banner */}
      {upcomingBooking && (
        <div className="glass rounded-2xl p-6 border-brand-cyan/20 border flex flex-col md:flex-row justify-between items-center mb-10 relative overflow-hidden group">
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-brand-cyan/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="flex items-center gap-4 relative z-10 mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full bg-brand-cyan/20 flex items-center justify-center border border-brand-cyan/40">
              <CalendarDays className="text-brand-cyan" size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">Upcoming Session</span>
              <h3 className="text-lg font-bold text-white">{upcomingBooking.trainer?.specialty} with {upcomingBooking.trainer?.name}</h3>
              <p className="text-sm text-text-secondary">{upcomingBooking.date} at {upcomingBooking.time}</p>
            </div>
          </div>
        </div>
      )}

      {/* Trainer grid */}
      {loading ? (
        <div className="flex items-center justify-center h-48 glass rounded-2xl border border-white/5">
          <Loader2 size={32} className="text-brand-cyan animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {trainers.map((trainer) => (
            <div key={trainer._id} className="group flex flex-col rounded-3xl overflow-hidden glass border border-white/10 hover:border-brand-purple/50 transition-colors duration-500 shadow-xl shadow-black/40">
              <div className="h-[280px] w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/60 to-transparent z-10"></div>
                <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-bg-dark/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/10 shadow-lg uppercase tracking-widest">{trainer.level}</span>
                </div>
              </div>
              <div className="relative z-20 p-6 xl:p-8 flex flex-col flex-1 -mt-10">
                <p className="text-brand-purple font-bold text-[11px] tracking-wider uppercase mb-1 drop-shadow-md">{trainer.specialty}</p>
                <h3 className="text-2xl font-black text-white mb-2">{trainer.name}</h3>
                <p className="text-text-secondary text-sm mb-6 flex-1">{trainer.bio}</p>
                <div className="glass bg-white/5 rounded-xl p-4 border border-white/5 mb-6 flex items-center gap-4">
                  <Clock size={20} className="text-brand-cyan" />
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase">Next Available Slot</p>
                    <p className="text-sm font-semibold text-white">{trainer.availableSlots?.[0]?.date}, {trainer.availableSlots?.[0]?.times?.[0]}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold text-white transition-colors">Profile</button>
                  <button onClick={() => openBookingModal(trainer)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-90 text-sm font-bold shadow-lg shadow-brand-cyan/20 text-white transition-all flex justify-center items-center gap-1 group/btn">
                    Book <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && trainers.length === 0 && (
        <div className="text-center py-20 glass rounded-2xl border-white/5">
          <p className="text-text-secondary">No trainers found matching your search.</p>
        </div>
      )}

      {/* Booking Modal */}
      {modalOpen && selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="glass w-full max-w-md rounded-3xl border border-white/10 shadow-2xl relative z-10 overflow-hidden bg-bg-dark/80 flex flex-col">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="flex justify-between items-center p-6 border-b border-white/5 relative z-10">
              <h3 className="text-xl font-black text-white tracking-wide">BOOK SESSION</h3>
              <button onClick={closeModal} className="p-2 glass rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors border-transparent"><X size={18} /></button>
            </div>
            <div className="p-6 relative z-10">
              {bookingSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-5 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 size={40} className="text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-black text-white mb-2">Confirmed!</h4>
                  <p className="text-text-secondary mb-1">Your session is locked in.</p>
                  <p className="text-brand-cyan font-bold text-sm bg-brand-cyan/10 px-5 py-2 rounded-xl border border-brand-cyan/20 mt-4 leading-relaxed">
                    {selectedDate} @ {selectedSlot}<br/>with {selectedTrainer.name.split(' ')[0]}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-8 bg-bg-dark/50 p-4 rounded-2xl border border-white/5">
                    <img src={selectedTrainer.image} alt={selectedTrainer.name} className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0 grayscale hover:grayscale-0 transition-all duration-300" />
                    <div>
                      <p className="text-[10px] text-brand-cyan font-bold uppercase mb-1 tracking-widest">{selectedTrainer.specialty}</p>
                      <h4 className="text-lg font-bold text-white leading-tight">{selectedTrainer.name}</h4>
                      <p className="text-[11px] text-text-secondary flex items-center gap-1 mt-1 font-medium"><MapPin size={12}/> The Grind House, Floor 1</p>
                    </div>
                  </div>
                  <h5 className="text-sm font-bold text-white mb-3">Select Date</h5>
                  <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {slots.map(s => (
                      <button key={s.date} onClick={() => { setSelectedDate(s.date); setSelectedSlot(null); }}
                        className={`min-w-[4.5rem] py-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          selectedDate === s.date
                            ? 'bg-brand-purple/20 border-brand-purple text-white shadow-lg shadow-brand-purple/20'
                            : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10 hover:text-white'
                        }`}>
                        <span className="text-[10px] uppercase font-bold mb-1 opacity-70">{s.date.split(' ')[0]}</span>
                        <span className="text-lg font-black">{s.date.split(' ')[1]}</span>
                      </button>
                    ))}
                  </div>
                  <h5 className="text-sm font-bold text-white mb-3">Available Slots</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {currentSlotTimes.map(slot => (
                      <button key={slot} onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 rounded-lg border text-sm font-bold transition-all ${
                          selectedSlot === slot
                            ? 'bg-brand-cyan text-bg-dark border-brand-cyan shadow-md shadow-brand-cyan/30'
                            : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10 hover:text-white'
                        }`}>{slot}</button>
                    ))}
                  </div>
                  <button onClick={handleBook} disabled={!selectedSlot || submitting}
                    className={`w-full py-4 rounded-xl font-black transition-all shadow-lg flex justify-center items-center gap-2 ${
                      selectedSlot && !submitting
                        ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-brand-purple/25 hover:opacity-90'
                        : 'bg-white/5 text-white/30 border border-white/5 shadow-none cursor-not-allowed'
                    }`}>
                    {submitting ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainersView;
