import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';
import { updateUser } from '../services/authService.js';

export default function UserProfile() {
  const { user, refresh } = useAuth();
  const { notify, reload } = useQuiz();
  const [name, setName] = useState(user.name);
  const [pw, setPw] = useState({ cur: '', next: '', confirm: '' });
  const saveName = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return notify('Name must be at least 2 characters.', 'error');
    updateUser(user.id, { name: name.trim() }); refresh(); reload(); notify('Profile updated.');
  };
  const savePw = (e) => {
    e.preventDefault();
    if (pw.cur !== user.password) return notify('Current password is incorrect.', 'error');
    if (pw.next.length < 6) return notify('New password must be at least 6 characters.', 'error');
    if (pw.next !== pw.confirm) return notify('Passwords do not match.', 'error');
    updateUser(user.id, { password: pw.next }); refresh(); setPw({ cur: '', next: '', confirm: '' }); notify('Password changed.');
  };
  const p = (k, label) => <label className="field">{label}<input className="input" type="password" value={pw[k]} onChange={(e) => setPw({ ...pw, [k]: e.target.value })} /></label>;
  return (
    <>
      <h1>Profile settings</h1>
      <div className="grid2">
        <form className="card" onSubmit={saveName}><h3>Your details</h3>
          <label className="field">Name<input className="input" value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label className="field">Email<input className="input" value={user.email} disabled /></label>
          <button className="btn btn-primary">Save changes</button></form>
        <form className="card" onSubmit={savePw}><h3>Change password</h3>{p('cur', 'Current password')}{p('next', 'New password')}{p('confirm', 'Confirm new password')}<button className="btn btn-primary">Update password</button></form>
      </div>
    </>
  );
}
