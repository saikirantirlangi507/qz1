import { fmtTime } from '../services/resultService.js';

export default function ScoreCard({ r }) {
  return (
    <div className="card score-card">
      <div className={`score-ring ${r.passed ? 'pass' : 'fail'}`} style={{ '--p': r.percent }}><span>{r.percent}%</span></div>
      <h2 className={r.passed ? 'pass-text' : 'fail-text'}>{r.passed ? '🎉 Passed' : '😕 Failed'}</h2>
      <div className="stat-grid">
        <div><b>{r.score} / {r.total}</b><small>Marks obtained</small></div>
        <div><b>{r.total}</b><small>Total marks</small></div>
        <div><b className="pass-text">{r.correct}</b><small>Correct</small></div>
        <div><b className="fail-text">{r.incorrect}</b><small>Incorrect</small></div>
        <div><b>{r.unanswered}</b><small>Unanswered</small></div>
        <div><b>{fmtTime(r.timeTaken)}</b><small>Time taken</small></div>
      </div>
    </div>
  );
}
