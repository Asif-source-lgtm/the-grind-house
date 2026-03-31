import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Mail, Phone, FileText, Camera, Save, 
  Bell, BellRing, Megaphone, 
  Moon, Palette, 
  Lock, ShieldCheck, KeyRound,
  Link2, Unlink,
  Globe, ChevronDown,
  Trash2, LogOut, AlertTriangle
} from 'lucide-react';
import { api } from '../../utils/api';
/* ── reusable toggle ── */
const Toggle = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
    <div className="pr-4">
      <p className="text-sm font-bold text-white">{label}</p>
      {description && <p className="text-xs text-text-secondary mt-0.5">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-7 rounded-full transition-colors duration-300 shrink-0 ${
        enabled ? 'bg-brand-cyan shadow-[0_0_14px_rgba(14,165,233,0.4)]' : 'bg-white/10'
      }`}
    >
      <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
        enabled ? 'translate-x-5' : 'translate-x-0'
      }`} />
    </button>
  </div>
);

/* ── section wrapper ── */
const Section = ({ title, icon: Icon, children, danger }) => (
  <div className={`glass rounded-2xl border ${danger ? 'border-red-500/30' : 'border-white/5'} mb-8 overflow-hidden`}>
    <div className={`flex items-center gap-3 px-7 py-5 border-b ${danger ? 'border-red-500/20' : 'border-white/5'}`}>
      <Icon size={20} className={danger ? 'text-red-500' : 'text-brand-cyan'} />
      <h3 className={`text-lg font-black tracking-wide ${danger ? 'text-red-400' : 'text-white'}`}>{title}</h3>
    </div>
    <div className="px-7 py-6">{children}</div>
  </div>
);

/* ── styled input ── */
const Input = ({ label, icon: Icon, ...props }) => (
  <div className="mb-5 last:mb-0">
    <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">{label}</label>
    <div className="flex items-center glass rounded-xl px-4 py-3 border border-white/10 focus-within:border-brand-purple/50 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all">
      {Icon && <Icon size={16} className="text-text-secondary mr-3 shrink-0" />}
      <input className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-text-secondary" {...props} />
    </div>
  </div>
);

const Settings = () => {
  const { user } = useAuth();

  /* profile */
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileMsg, setProfileMsg] = useState('');
  const [saving, setSaving] = useState(false);

  /* notifications */
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [prAlerts, setPrAlerts] = useState(true);
  const [marketing, setMarketing] = useState(false);

  /* appearance */
  const [darkMode, setDarkMode] = useState(true);
  const [accentColor, setAccentColor] = useState('cyan');
  const accentOptions = [
    { name: 'cyan', color: 'bg-cyan-500', shadow: 'shadow-cyan-500/40' },
    { name: 'purple', color: 'bg-purple-500', shadow: 'shadow-purple-500/40' },
    { name: 'emerald', color: 'bg-emerald-500', shadow: 'shadow-emerald-500/40' },
    { name: 'rose', color: 'bg-rose-500', shadow: 'shadow-rose-500/40' },
    { name: 'amber', color: 'bg-amber-500', shadow: 'shadow-amber-500/40' },
  ];

  /* security */
  const [twoFA, setTwoFA] = useState(false);
  const [curPwd, setCurPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [cfmPwd, setCfmPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [pwdSaving, setPwdSaving] = useState(false);

  const getToken = () => localStorage.getItem('gym_jwt_token');

  const saveProfile = async () => {
    setSaving(true); setProfileMsg('');
    try {
      const res = await fetch(api('/api/settings/profile'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ name, email, phone, bio })
      });
      const data = await res.json();
      setProfileMsg(data.success ? '✅ Profile saved!' : `❌ ${data.message}`);
      if (data.success) {
        localStorage.setItem('gym_user', JSON.stringify(data.user));
      }
    } catch { setProfileMsg('❌ Network error'); }
    finally { setSaving(false); setTimeout(() => setProfileMsg(''), 3000); }
  };

  const changePassword = async () => {
    setPwdMsg('');
    if (newPwd !== cfmPwd) { setPwdMsg('❌ Passwords do not match'); return; }
    if (newPwd.length < 6) { setPwdMsg('❌ Minimum 6 characters'); return; }
    setPwdSaving(true);
    try {
      const res = await fetch(api('/api/settings/password'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ currentPassword: curPwd, newPassword: newPwd })
      });
      const data = await res.json();
      setPwdMsg(data.success ? '✅ Password updated!' : `❌ ${data.message}`);
      if (data.success) { setCurPwd(''); setNewPwd(''); setCfmPwd(''); }
    } catch { setPwdMsg('❌ Network error'); }
    finally { setPwdSaving(false); setTimeout(() => setPwdMsg(''), 3000); }
  };

  /* connected apps */
  const connectedApps = [
    { name: 'Google Fit', icon: '🏃', connected: true, desc: 'Sync workouts and step data' },
    { name: 'Apple Health', icon: '❤️', connected: false, desc: 'Heart rate and activity sharing' },
    { name: 'Strava', icon: '🚴', connected: true, desc: 'Cardio session auto-upload' },
    { name: 'MyFitnessPal', icon: '🥗', connected: false, desc: 'Nutrition and calorie tracking' },
  ];
  const [apps, setApps] = useState(connectedApps);

  const toggleApp = (index) => {
    setApps(prev => prev.map((app, i) => i === index ? { ...app, connected: !app.connected } : app));
  };

  /* language */
  const [language, setLanguage] = useState('English');
  const [langOpen, setLangOpen] = useState(false);
  const languages = ['English', 'Urdu', 'Hindi', 'Arabic', 'Spanish', 'French', 'German'];

  return (
    <div className="pb-10 font-sans max-w-4xl">
      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-1 uppercase">Settings</h1>
        <p className="text-text-secondary">Manage your account, preferences, and security.</p>
      </div>

      {/* ── 1. Profile ── */}
      <Section title="PROFILE INFORMATION" icon={User}>
        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl border-2 border-brand-cyan/50 overflow-hidden shadow-lg shadow-brand-cyan/20">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </button>
            </div>
            <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Change Photo</span>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Input label="Full Name" icon={User} value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
            <Input label="Email Address" icon={Mail} value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
            <Input label="Phone Number" icon={Phone} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+92 ..." />
            <Input label="Bio" icon={FileText} value={bio} onChange={e => setBio(e.target.value)} placeholder="A short bio..." />
          </div>
        </div>
        <div className="flex items-center gap-4 justify-end">
          {profileMsg && <span className={`text-sm font-bold ${profileMsg.startsWith('✅') ? 'text-emerald-400' : 'text-red-400'}`}>{profileMsg}</span>}
          <button onClick={saveProfile} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-xl text-sm font-bold shadow-lg shadow-brand-purple/20 hover:opacity-90 transition-all text-white disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </Section>

      {/* ── 2. Notifications ── */}
      <Section title="NOTIFICATION PREFERENCES" icon={Bell}>
        <Toggle enabled={emailNotif} onChange={setEmailNotif} label="Email Notifications" description="Workout reminders and booking confirmations" />
        <Toggle enabled={pushNotif} onChange={setPushNotif} label="Push Notifications" description="Real-time alerts on your device" />
        <Toggle enabled={prAlerts} onChange={setPrAlerts} label="PR Alerts" description="Get notified when you break a personal record" />
        <Toggle enabled={marketing} onChange={setMarketing} label="Marketing & Offers" description="Promotions, discounts, and gym events" />
      </Section>

      {/* ── 3. Appearance ── */}
      <Section title="APPEARANCE" icon={Palette}>
        <Toggle enabled={darkMode} onChange={setDarkMode} label="Dark Mode" description="Run the interface in dark theme (recommended)" />
        <div className="pt-5">
          <p className="text-sm font-bold text-white mb-1">Accent Color</p>
          <p className="text-xs text-text-secondary mb-4">Choose your preferred highlight color across the dashboard.</p>
          <div className="flex gap-3">
            {accentOptions.map(opt => (
              <button
                key={opt.name}
                onClick={() => setAccentColor(opt.name)}
                className={`w-10 h-10 rounded-xl ${opt.color} transition-all duration-300 ${
                  accentColor === opt.name
                    ? `ring-2 ring-offset-2 ring-offset-bg-dark ring-white shadow-lg ${opt.shadow} scale-110`
                    : 'opacity-50 hover:opacity-80 hover:scale-105'
                }`}
                title={opt.name}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ── 4. Language Preferences ── */}
      <Section title="LANGUAGE PREFERENCES" icon={Globe}>
        <p className="text-sm text-text-secondary mb-4">Select your preferred language for the dashboard interface.</p>
        <div className="relative w-full md:w-72">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="w-full flex items-center justify-between glass rounded-xl px-4 py-3 border border-white/10 hover:border-brand-purple/50 transition-colors text-sm text-white font-medium"
          >
            <span className="flex items-center gap-2"><Globe size={16} className="text-brand-cyan" /> {language}</span>
            <ChevronDown size={16} className={`text-text-secondary transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
          </button>
          {langOpen && (
            <div className="absolute top-full left-0 mt-2 w-full glass rounded-xl border border-white/10 shadow-2xl shadow-black/50 z-30 overflow-hidden animate-fade-in">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setLangOpen(false); }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                    language === lang
                      ? 'bg-brand-cyan/10 text-brand-cyan font-bold'
                      : 'text-text-secondary hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* ── 5. Connected Apps ── */}
      <Section title="CONNECTED APPS" icon={Link2}>
        <p className="text-sm text-text-secondary mb-5">Manage third-party integrations and data sync.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {apps.map((app, index) => (
            <div key={app.name} className="flex items-center justify-between bg-white/[0.03] rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors group">
              <div className="flex items-center gap-4">
                <span className="text-2xl w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl shrink-0">{app.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{app.name}</p>
                  <p className="text-[11px] text-text-secondary">{app.desc}</p>
                </div>
              </div>
              <button
                onClick={() => toggleApp(index)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  app.connected
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30'
                    : 'bg-white/5 text-text-secondary border border-white/10 hover:bg-brand-cyan/10 hover:text-brand-cyan hover:border-brand-cyan/30'
                }`}
              >
                {app.connected ? <><Unlink size={12} /> Connected</> : <><Link2 size={12} /> Connect</>}
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 6. Security & Privacy ── */}
      <Section title="SECURITY & PRIVACY" icon={ShieldCheck}>
        <Toggle enabled={twoFA} onChange={setTwoFA} label="Two-Factor Authentication" description="Add an extra layer of security to your account" />
        {twoFA && (
          <div className="mt-3 mb-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <ShieldCheck size={16} /> 2FA is active. Your account is secured with an authenticator app.
          </div>
        )}
        <div className="border-t border-white/5 mt-4 pt-6">
          <p className="text-sm font-bold text-white mb-4">Change Password</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Current Password" icon={Lock} type="password" placeholder="••••••••" value={curPwd} onChange={e => setCurPwd(e.target.value)} />
            <Input label="New Password" icon={KeyRound} type="password" placeholder="••••••••" value={newPwd} onChange={e => setNewPwd(e.target.value)} />
            <Input label="Confirm Password" icon={KeyRound} type="password" placeholder="••••••••" value={cfmPwd} onChange={e => setCfmPwd(e.target.value)} />
          </div>
          <div className="flex items-center gap-4 justify-end mt-4">
            {pwdMsg && <span className={`text-sm font-bold ${pwdMsg.startsWith('✅') ? 'text-emerald-400' : 'text-red-400'}`}>{pwdMsg}</span>}
            <button onClick={changePassword} disabled={pwdSaving} className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm font-bold text-white transition-colors disabled:opacity-50">
              {pwdSaving ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </div>
      </Section>

      {/* ── 7. Danger Zone ── */}
      <Section title="DANGER ZONE" icon={AlertTriangle} danger>
        <p className="text-sm text-text-secondary mb-6">Irreversible actions that affect your account permanently.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/20 hover:border-red-500/50 transition-all">
            <LogOut size={16} /> Log Out All Devices
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/20 hover:border-red-500/50 transition-all">
            <Trash2 size={16} /> Delete Account
          </button>
        </div>
      </Section>
    </div>
  );
};

export default Settings;
