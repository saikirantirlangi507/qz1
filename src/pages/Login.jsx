import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const { notify } = useQuiz();
  const nav = useNavigate();
  const from = useLocation().state?.from;
  const [role, setRole] = useState('user');
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr('Enter a valid email address.');
    if (!f.password) return setErr('Enter your password.');
    setErr(''); setBusy(true);
    setTimeout(() => {
      try { const u = login(f.email, f.password, role); notify(`Welcome back, ${u.name}!`); nav(u.role === 'admin' ? '/admin' : from || '/dashboard', { replace: true }); }
      catch (x) { setErr(x.message); notify(x.message, 'error'); setBusy(false); }
    }, 500);
  };
  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit} noValidate>
        <h1>Welcome back</h1>
        <div className="tabs">{['user', 'admin'].map((r) => <button type="button" key={r} className={role === r ? 'active' : ''} onClick={() => { setRole(r); setErr(''); }}>{r === 'user' ? 'User Login' : 'Admin Login'}</button>)}</div>
        <label className="field">Email<input className="input" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
        <label className="field">Password<input className="input" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></label>
        {err && <div className="alert">{err}</div>}
        <button className="btn btn-primary block" disabled={busy}>{busy ? <span className="spinner sm" /> : 'Login'}</button>
        {role === 'admin' && <button type="button" className="btn btn-outline block" onClick={() => setF({ email: 'admin@quizbuilder.com', password: 'Admin@123' })}>Fill demo admin credentials</button>}
        {role === 'user' && <p className="muted center-text">New here? <Link to="/register">Create an account</Link></p>}
      </form>
    </div>
  );
}
