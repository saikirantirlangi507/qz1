import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const { notify } = useQuiz();
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', password: '', confirm: '' });
  const [err, setErr] = useState({});
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = 'Name must be at least 2 characters.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email address.';
    if (f.password.length < 6) x.password = 'Password must be at least 6 characters.';
    if (f.confirm !== f.password) x.confirm = 'Passwords do not match.';
    setErr(x);
    if (Object.keys(x).length) return;
    try { register(f); notify('Account created. Welcome to Quiz Builder!'); nav('/dashboard'); }
    catch (ex) { setErr({ email: ex.message }); notify(ex.message, 'error'); }
  };
  const field = (k, label, type = 'text') => (
    <label className="field">{label}<input className="input" type={type} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />{err[k] && <small className="error">{err[k]}</small>}</label>
  );
  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit} noValidate>
        <h1>Create your account</h1>
        {field('name', 'Full name')}{field('email', 'Email', 'email')}{field('password', 'Password', 'password')}{field('confirm', 'Confirm password', 'password')}
        <button className="btn btn-primary block">Register</button>
        <p className="muted center-text">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
