import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';
import { quizStats } from '../services/resultService.js';
import { BarChart } from './Reports.jsx';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { quizzes, results, users } = useQuiz();
  const stats = quizStats(quizzes, results);
  const recent = [...results].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  return (
    <>
      <h1>Admin overview</h1><p className="muted">Hello {user.name}, here is how Quiz Builder is doing.</p>
      <div className="stat-cards">
        <div className="card stat"><small>Users</small><b>{users.filter((u) => u.role === 'user').length}</b></div>
        <div className="card stat"><small>Quizzes</small><b>{quizzes.length}</b></div>
        <div className="card stat"><small>Attempts</small><b>{results.length}</b></div>
        <div className="card stat"><small>Drafts</small><b>{quizzes.filter((q) => q.status === 'draft').length}</b></div>
      </div>
      <div className="grid2">
        <div className="card"><h3>Average score by quiz</h3><BarChart data={stats.map((s) => ({ label: s.title.replace(' Quiz', '').slice(0, 10), value: s.avg }))} /></div>
        <div className="card"><h3>Recent attempts</h3>{recent.length ? recent.map((r) => <p key={r.id} className="recent"><b>{r.userName}</b> · {r.quizTitle} · {r.percent}%</p>) : <p className="muted">No attempts yet.</p>}<Link className="btn btn-sm btn-outline" to="/admin/results">All results</Link></div>
      </div>
    </>
  );
}
