import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext.jsx';
import { fmtTime } from '../services/resultService.js';

export default function QuizResults() {
  const { results, quizzes, notify } = useQuiz();
  const [qid, setQid] = useState('');
  const list = results.filter((r) => !qid || r.quizId === qid).sort((a, b) => new Date(b.date) - new Date(a.date));
  const exportCsv = () => {
    if (!list.length) return notify('Nothing to export.', 'error');
    const rows = [['User', 'Quiz', 'Score', 'Total', 'Percent', 'Status', 'Time (s)', 'Date'], ...list.map((r) => [r.userName, r.quizTitle, r.score, r.total, r.percent, r.passed ? 'Pass' : 'Fail', r.timeTaken, r.date])];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'quiz-results.csv'; a.click();
    notify('Results exported.');
  };
  return (
    <>
      <div className="row between"><h1>Quiz results</h1><button className="btn btn-outline" onClick={exportCsv}>⬇ Export CSV</button></div>
      <select className="input" value={qid} onChange={(e) => setQid(e.target.value)}><option value="">All quizzes</option>{quizzes.map((q) => <option key={q.id} value={q.id}>{q.title}</option>)}</select>
      <div className="card table-wrap"><table><thead><tr><th>User</th><th>Quiz</th><th>Score</th><th>%</th><th>Status</th><th>Time</th><th>Date</th><th></th></tr></thead><tbody>
        {list.map((r) => <tr key={r.id}><td>{r.userName}</td><td>{r.quizTitle}</td><td>{r.score}/{r.total}</td><td>{r.percent}%</td><td><span className={`badge ${r.passed ? 'ok' : 'bad'}`}>{r.passed ? 'Pass' : 'Fail'}</span></td><td>{fmtTime(r.timeTaken)}</td><td>{new Date(r.date).toLocaleDateString()}</td><td><Link className="btn btn-sm btn-outline" to={`/result/${r.id}`}>View</Link></td></tr>)}
      </tbody></table>{!list.length && <p className="empty">No results yet.</p>}</div>
    </>
  );
}
