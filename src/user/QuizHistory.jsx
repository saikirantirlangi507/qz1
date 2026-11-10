import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';
import { fmtTime } from '../services/resultService.js';

export default function QuizHistory() {
  const { user } = useAuth();
  const { results } = useQuiz();
  const mine = results.filter((r) => r.userId === user.id).sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <>
      <h1>Quiz history</h1>
      {mine.length ? (
        <div className="card table-wrap"><table><thead><tr><th>Date</th><th>Quiz</th><th>Marks</th><th>%</th><th>Status</th><th>Time</th><th></th></tr></thead><tbody>
          {mine.map((r) => <tr key={r.id}><td>{new Date(r.date).toLocaleDateString()}</td><td>{r.quizTitle}</td><td>{r.score}/{r.total}</td><td>{r.percent}%</td><td><span className={`badge ${r.passed ? 'ok' : 'bad'}`}>{r.passed ? 'Pass' : 'Fail'}</span></td><td>{fmtTime(r.timeTaken)}</td><td><Link className="btn btn-sm btn-outline" to={`/result/${r.id}`}>Review</Link></td></tr>)}
        </tbody></table></div>
      ) : <div className="card empty"><p>No attempts yet.</p><Link className="btn btn-primary" to="/dashboard/explore">Take a quiz</Link></div>}
    </>
  );
}
