import { useState } from 'react';
import { useQuiz } from '../context/QuizContext.jsx';
import { get, set, uid } from '../services/storageService.js';

export default function Contact() {
  const { notify } = useQuiz();
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const [err, setErr] = useState({});
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!f.name.trim()) x.name = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email.';
    if (f.message.trim().length < 10) x.message = 'Message must be at least 10 characters.';
    setErr(x);
    if (Object.keys(x).length) return notify('Please fix the highlighted fields.', 'error');
    set('qb_messages', [...get('qb_messages', []), { id: uid(), ...f, date: new Date().toISOString() }]);
    setF({ name: '', email: '', message: '' }); notify('Message sent. We will get back to you soon!');
  };
  const field = (k, label, props = {}) => (
    <label className="field">{label}
      {k === 'message' ? <textarea className="input" rows={5} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} /> : <input className="input" {...props} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />}
      {err[k] && <small className="error">{err[k]}</small>}
    </label>
  );
  return (
    <div className="container page narrow">
      <h1>Contact us</h1>
      <form className="card" onSubmit={submit} noValidate>
        {field('name', 'Your name')}{field('email', 'Email', { type: 'email' })}{field('message', 'Message')}
        <button className="btn btn-primary">Send message</button>
      </form>
    </div>
  );
}
