import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';
import { updateUser } from '../services/authService.js';
import { resetAll } from '../services/storageService.js';
import ConfirmationModal from '../components/ConfirmationModal.jsx';

export default function AdminSettings() {
  const { user, refresh, logout } = useAuth();
  const { notify, reload } = useQuiz();
  const [name, setName] = useState(user.name);
  const [pw, setPw] = useState({ cur: '', next: '', confirm: '' });
  const [reset, setReset] = useState(false);
  const saveName = (e) => { e.preventDefault(); if (name.trim().length < 2) return notify('Name is too short.', 'error'); updateUser(user.id, { name: name.trim() }); refresh(); notify('Settings saved.'); };
  const savePw = (e) => {
    e.preventDefault();
    if (pw.cur !== user.password) return notify('Current password is incorrect.', 'error');
    if (pw.next.length < 6) return notify('New password must be at least 6 characters.', 'error');
    if (pw.next !== pw.confirm) return notify('Passwords do not match.', 'error');
    updateUser(user.id, { password: pw.next }); refresh(); setPw({ cur: '', next: '', confirm: '' }); notify('Password changed.');
  };
  const p = (k, l) => <label className="field">{l}<input className="input" type="password" value={pw[k]} onChange={(e) => setPw({ ...pw, [k]: e.target.value })} /></label>;
  return (
    <>
      <h1>Settings</h1>
      <div className="grid2">
        <form className="card" onSubmit={saveName}><h3>Admin profile</h3><label className="field">Name<input className="input" value={name} onChange={(e) => setName(e.target.value)} /></label><label className="field">Email<input className="input" value={user.email} disabled /></label><button className="btn btn-primary">Save changes</button></form>
        <form className="card" onSubmit={savePw}><h3>Change password</h3>{p('cur', 'Current password')}{p('next', 'New password')}{p('confirm', 'Confirm password')}<button className="btn btn-primary">Update password</button></form>
      </div>
      <div className="card"><h3>Demo data</h3><p>Reset all users, quizzes and results back to the original demo data.</p><button className="btn btn-danger" onClick={() => setReset(true)}>Reset all data</button></div>
      <ConfirmationModal open={reset} danger title="Reset all data?" confirmText="Reset" onConfirm={() => { resetAll(); logout(); reload(); notify('Data reset. Please log in again.'); }} onCancel={() => setReset(false)}>This deletes every custom quiz, user and result, and logs you out.</ConfirmationModal>
    </>
  );
}
