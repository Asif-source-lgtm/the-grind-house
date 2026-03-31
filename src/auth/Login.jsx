import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Dumbbell, ArrowRight, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-cyan/10 blur-[120px] rounded-full point-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 blur-[120px] rounded-full point-events-none"></div>
      
      <Link to="/" className="absolute top-8 left-8 md:left-12 flex items-center gap-2 text-text-secondary hover:text-white transition-colors">
        <Dumbbell className="text-brand-cyan" size={24} />
        <span className="font-bold tracking-widest uppercase text-sm">The Grind House</span>
      </Link>

      <div className="glass w-full max-w-md p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2 tracking-wide">WELCOME BACK</h2>
          <p className="text-text-secondary text-sm">Enter your credentials to access the portal.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-text-secondary focus:outline-none focus:border-brand-cyan/50 focus:bg-white/10 transition-all font-medium"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-text-secondary focus:outline-none focus:border-brand-purple/50 focus:bg-white/10 transition-all font-medium"
            />
          </div>

          <div className="flex justify-end mb-2">
            <a href="#" className="text-xs text-text-secondary hover:text-brand-cyan transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-purple/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Authenticating...' : <>Authenticate <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-text-secondary">
          Don't have an account? <Link to="/signup" className="text-white font-bold hover:text-brand-cyan transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
