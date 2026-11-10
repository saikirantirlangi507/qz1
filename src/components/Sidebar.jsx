import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';

export function Sidebar({ links, open, onClose }) {
  const { user, logout } = useAuth();
  const { notify } = useQuiz();
  const nav = useNavigate();
  const out = () => { logout(); notify('You have been logged out.'); nav('/'); };
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="side-user"><div className="avatar">{user?.name?.[0]?.toUpperCase()}</div><div><strong>{user?.name}</strong><small>{user?.role === 'admin' ? 'Administrator' : 'Student'}</small></div></div>
      {links.map((l) => <NavLink key={l.to} to={l.to} end={l.end} onClick={onClose}><span>{l.icon}</span> {l.label}</NavLink>)}
      <button className="side-logout" onClick={out}><span>🚪</span> Logout</button>
    </aside>
  );
}

export default function Shell({ links, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="shell">
      <Sidebar links={links} open={open} onClose={() => setOpen(false)} />
      <main className="shell-main">
        <button className="side-toggle btn btn-sm btn-outline" onClick={() => setOpen(!open)}>☰ Menu</button>
        {children}
      </main>
    </div>
  );
}

export const adminLinks = [
  { to: '/admin', end: true, icon: '📊', label: 'Dashboard Overview' },
  { to: '/admin/create', icon: '➕', label: 'Create New Quiz' },
  { to: '/admin/quizzes', icon: '🗂️', label: 'Manage Quizzes' },
  { to: '/admin/questions', icon: '❓', label: 'Manage Questions' },
  { to: '/admin/users', icon: '👥', label: 'Manage Users' },
  { to: '/admin/results', icon: '🏁', label: 'Quiz Results' },
  { to: '/admin/reports', icon: '📈', label: 'Reports and Analytics' },
  { to: '/admin/settings', icon: '⚙️', label: 'Settings' },
];
export const userLinks = [
  { to: '/dashboard', end: true, icon: '🏠', label: 'Dashboard' },
  { to: '/dashboard/explore', icon: '🔎', label: 'Explore Quizzes' },
  { to: '/dashboard/history', icon: '🕘', label: 'Quiz History' },
  { to: '/dashboard/leaderboard', icon: '🏆', label: 'Leaderboard' },
  { to: '/dashboard/profile', icon: '👤', label: 'Profile Settings' },
];
