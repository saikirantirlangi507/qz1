import { useQuiz } from '../context/QuizContext.jsx';
import { quizStats } from '../services/resultService.js';

export function BarChart({ data, unit = '%' }) {
  return (
    <div className="bars">{data.map((d) => (
      <div className="bar-col" key={d.label}><span className="bar-val">{d.raw ?? d.value}{d.raw === undefined ? unit : ""}</span><div className="bar-track"><div className="bar" style={{ height: `${Math.max(d.value, 2)}%` }} /></div><span className="bar-lab">{d.label}</span></div>
    ))}</div>
  );
}

export default function Reports() {
  const { quizzes, results, users } = useQuiz();
  const stats = quizStats(quizzes, results);
  const avg = results.length ? Math.round(results.reduce((s, r) => s + r.percent, 0) / results.length) : 0;
  const high = results.length ? Math.max(...results.map((r) => r.percent)) : 0;
  return (
    <>
      <h1>Reports and analytics</h1>
      <div className="stat-cards">
        <div className="card stat"><small>Total users</small><b>{users.filter((u) => u.role === 'user').length}</b></div>
        <div className="card stat"><small>Total quizzes</small><b>{quizzes.length}</b></div>
        <div className="card stat"><small>Total attempts</small><b>{results.length}</b></div>
        <div className="card stat"><small>Average score</small><b>{avg}%</b></div>
        <div className="card stat"><small>Highest score</small><b>{high}%</b></div>
      </div>
      <div className="card"><h3>Average score by quiz</h3><BarChart data={stats.map((s) => ({ label: s.title.replace(' Quiz', ''), value: s.avg }))} /></div>
      <div className="card"><h3>Attempts by quiz</h3><BarChart unit="" data={(() => { const m = Math.max(1, ...stats.map((s) => s.attempts)); return stats.map((s) => ({ label: s.title.replace(' Quiz', ''), value: Math.round((s.attempts / m) * 100), raw: s.attempts })); })().map((d) => ({ ...d, value: d.value }))} /></div>
      <div className="card table-wrap"><table><thead><tr><th>Quiz</th><th>Attempts</th><th>Average</th><th>Highest</th></tr></thead><tbody>{stats.map((s) => <tr key={s.id}><td>{s.title}</td><td>{s.attempts}</td><td>{s.avg}%</td><td>{s.high}%</td></tr>)}</tbody></table></div>
    </>
  );
}
