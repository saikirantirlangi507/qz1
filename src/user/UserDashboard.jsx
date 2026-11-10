import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';
import { fmtTime, userResults } from '../services/resultService.js';
import { QuizBrowser } from './ExploreQuizzes.jsx';

export default function UserDashboard() {
  const { user } = useAuth();
  const { results } = useQuiz();
  const mine = userResults(user.id).filter((r) => results.some((x) => x.id === r.id));
  const avg = mine.length ? Math.round(mine.reduce((s, r) => s + r.percent, 0) / mine.length) : 0;
  const best = mine.length ? Math.max(...mine.map((r) => r.percent)) : 0;
  return (
    <>
      <h1>Welcome, {user.name} 👋</h1>
      <div className="stat-cards">
        <div className="card stat"><small>Quizzes completed</small><b>{mine.length}</b></div>
        <div className="card stat"><small>Average score</small><b>{avg}%</b></div>
        <div className="card stat"><small>Best score</small><b>{best}%</b></div>
      </div>
      <h2>Recently attempted</h2>
      {mine.length ? (
        <div className="card table-wrap"><table><thead><tr><th>Quiz</th><th>Score</th><th>Status</th><th>Time</th><th></th></tr></thead><tbody>
          {mine.slice(0, 4).map((r) => <tr key={r.id}><td>{r.quizTitle}</td><td>{r.percent}%</td><td><span className={`badge ${r.passed ? 'ok' : 'bad'}`}>{r.passed ? 'Pass' : 'Fail'}</span></td><td>{fmtTime(r.timeTaken)}</td><td><Link className="btn btn-sm btn-outline" to={`/result/${r.id}`}>View</Link></td></tr>)}
        </tbody></table></div>
      ) : <div className="card empty"><p>You have not attempted any quiz yet. Pick one below to begin.</p></div>}
      <h2>Available quizzes</h2>
      <QuizBrowser />
    </>
  );
}
