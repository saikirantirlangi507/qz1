import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { notify } = useQuiz();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const close = () => setOpen(false);
  const out = () => { logout(); close(); notify('You have been logged out.'); nav('/'); };
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}><img src="/logo.png" alt="" /> Quiz Builder</Link>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/explore" onClick={close}>Explore Quizzes</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
          {user ? (
            <>
              <NavLink to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={close}>Dashboard</NavLink>
              <button className="btn btn-outline-light btn-sm" onClick={out}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={close}>Login</NavLink>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={close}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
