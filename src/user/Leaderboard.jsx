import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';
import { leaderboard } from '../services/resultService.js';

export default function Leaderboard() {
  const { user } = useAuth();
  const { results } = useQuiz();
  const rows = leaderboard(results);
  const medal = ['🥇', '🥈', '🥉'];
  return (
    <>
      <h1>Leaderboard</h1>
      {rows.length ? (
        <div className="card table-wrap"><table className="lb"><thead><tr><th>Rank</th><th>Username</th><th>Total points</th><th>Quizzes completed</th><th>Highest score</th></tr></thead><tbody>
          {rows.map((r, i) => <tr key={r.userId} className={`${i < 3 ? `top top${i + 1}` : ''} ${r.userId === user?.id ? 'me' : ''}`}><td>{medal[i] || i + 1}</td><td>{r.name}{r.userId === user?.id && ' (you)'}</td><td>{r.points}</td><td>{r.quizzes}</td><td>{r.highest}%</td></tr>)}
        </tbody></table></div>
      ) : <div className="card empty"><p>No attempts yet. Complete a quiz to appear here.</p></div>}
    </>
  );
}
