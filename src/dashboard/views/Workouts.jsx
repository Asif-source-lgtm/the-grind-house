import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Flame, Activity, Trophy, ChevronRight, Trash2, X, Loader2 } from 'lucide-react';
import { api } from '../../utils/api';

const API = api('/api/workouts');
const getToken = () => localStorage.getItem('gym_jwt_token');

const prMetrics = [
  { lift: 'Bench Press', weight: '225 lbs', date: 'Mar 15, 2026', icon: Activity, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10', border: 'border-brand-cyan/30' },
  { lift: 'Squat', weight: '315 lbs', date: 'Mar 22, 2026', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  { lift: 'Deadlift', weight: '405 lbs', date: 'Feb 10, 2026', icon: Trophy, color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/30' }
];

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(null);

  // Form state
  const [form, setForm] = useState({ exerciseName: '', sets: '', reps: '', caloriesBurned: '' });
  const [formError, setFormError] = useState('');

  // Fetch workouts from API
  const fetchWorkouts = useCallback(async () => {
    try {
      const res = await fetch(API, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await res.json();
      if (data.success) setWorkouts(data.workouts);
    } catch (err) {
      console.error('Failed to fetch workouts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWorkouts(); }, [fetchWorkouts]);

  // Add workout
  const handleAdd = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.exerciseName || !form.sets || !form.reps) {
      setFormError('Exercise name, sets, and reps are required.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({
          exerciseName: form.exerciseName,
          sets: Number(form.sets),
          reps: Number(form.reps),
          caloriesBurned: Number(form.caloriesBurned) || 0,
        })
      });
      const data = await res.json();
      if (data.success) {
        setWorkouts(prev => [data.workout, ...prev]);
        setForm({ exerciseName: '', sets: '', reps: '', caloriesBurned: '' });
        setModalOpen(false);
      } else {
        setFormError(data.message);
      }
    } catch (err) {
      setFormError('Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete workout
  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      const res = await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await res.json();
      if (data.success) {
        setWorkouts(prev => prev.filter(w => w._id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();
    const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="pb-10 font-sans">
      {/* Header */}
      <div className="flex justify-between items-end mb-8 relative z-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-1">WORKOUTS</h1>
          <p className="text-text-secondary">Track your sessions and break your limits.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-xl text-sm font-bold shadow-lg shadow-brand-purple/20 hover:opacity-90 transition-all text-white group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" /> Log Session
        </button>
      </div>

      {/* PR Metrics (static showcase) */}
      <h2 className="text-lg font-bold text-white mb-4">Current 1-Rep Maxes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {prMetrics.map((pr) => (
          <div key={pr.lift} className="glass rounded-2xl p-6 border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${pr.bg} ${pr.border} border`}>
                <pr.icon size={22} className={pr.color} />
              </div>
              <div className="text-right">
                <p className="text-xs text-text-secondary mb-1">All Time PR</p>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded-md border border-emerald-500/30">Active</span>
              </div>
            </div>
            <h3 className="text-text-secondary text-sm font-medium mb-1">{pr.lift}</h3>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-white">{pr.weight}</span>
              <span className="text-xs text-text-secondary mb-1.5 font-medium">{pr.date}</span>
            </div>
            <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${pr.bg} blur-2xl group-hover:scale-125 transition-transform duration-500`}></div>
          </div>
        ))}
      </div>

      {/* Recent Sessions — REAL DATA */}
      <h2 className="text-lg font-bold text-white mb-4">
        Recent Sessions
        {!loading && <span className="text-text-secondary text-sm font-medium ml-2">({workouts.length})</span>}
      </h2>

      {loading ? (
        <div className="flex items-center justify-center h-48 glass rounded-2xl border border-white/5">
          <Loader2 size={32} className="text-brand-cyan animate-spin" />
        </div>
      ) : workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 glass rounded-2xl border border-white/5">
          <p className="text-text-secondary mb-3">No workouts logged yet.</p>
          <button onClick={() => setModalOpen(true)} className="text-brand-cyan text-sm font-bold hover:underline">Log your first session →</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
          {workouts.map((w) => (
            <div key={w._id} className="glass rounded-2xl p-6 border-white/5 relative overflow-hidden group border border-transparent hover:border-brand-purple/30 transition-all flex flex-col justify-between h-52">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 blur-2xl rounded-full group-hover:bg-brand-purple/10 transition-all"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">{formatDate(w.date)}</span>
                  <button
                    onClick={() => handleDelete(w._id)}
                    disabled={deleting === w._id}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                    title="Delete workout"
                  >
                    {deleting === w._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 leading-tight">{w.exerciseName}</h3>
              </div>

              <div className="flex items-center justify-between mt-auto relative z-10">
                <div className="flex gap-4">
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase">Sets</p>
                    <p className="text-sm font-bold text-white">{w.sets}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase">Reps</p>
                    <p className="text-sm font-bold text-white">{w.reps}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-secondary uppercase">Calories</p>
                    <p className="text-sm font-bold text-brand-cyan">{w.caloriesBurned || '—'}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-text-secondary" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Log Session Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>

          <div className="glass w-full max-w-md rounded-3xl border border-white/10 shadow-2xl relative z-10 overflow-hidden bg-bg-dark/80">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex justify-between items-center p-6 border-b border-white/5 relative z-10">
              <h3 className="text-xl font-black text-white tracking-wide">LOG WORKOUT</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 glass rounded-full hover:bg-white/10 text-text-secondary hover:text-white transition-colors border-transparent">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="p-6 relative z-10 flex flex-col gap-5">
              {formError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-semibold text-center">{formError}</div>
              )}

              <div>
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">Exercise Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bench Press"
                  value={form.exerciseName}
                  onChange={e => setForm(p => ({ ...p, exerciseName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-text-secondary focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all font-medium text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">Sets</label>
                  <input
                    type="number" min="1"
                    placeholder="4"
                    value={form.sets}
                    onChange={e => setForm(p => ({ ...p, sets: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-text-secondary focus:outline-none focus:border-brand-cyan/50 transition-all font-medium text-sm text-center"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">Reps</label>
                  <input
                    type="number" min="1"
                    placeholder="10"
                    value={form.reps}
                    onChange={e => setForm(p => ({ ...p, reps: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-text-secondary focus:outline-none focus:border-brand-purple/50 transition-all font-medium text-sm text-center"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">Calories</label>
                  <input
                    type="number" min="0"
                    placeholder="150"
                    value={form.caloriesBurned}
                    onChange={e => setForm(p => ({ ...p, caloriesBurned: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-text-secondary focus:outline-none focus:border-brand-purple/50 transition-all font-medium text-sm text-center"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-black shadow-lg shadow-brand-purple/25 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {submitting ? 'Saving...' : 'Save Workout'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
