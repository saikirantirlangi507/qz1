import { useState } from 'react';
import { useQuiz } from '../context/QuizContext.jsx';
import { isLive } from '../services/quizService.js';
import { categories, difficulties } from '../data/categories.js';
import QuizCard from '../components/QuizCard.jsx';

export function QuizBrowser({ limit }) {
  const { quizzes } = useQuiz();
  const [s, setS] = useState(''); const [cat, setCat] = useState(''); const [diff, setDiff] = useState('');
  const list = quizzes.filter(isLive).filter((q) => (!cat || q.category === cat) && (!diff || q.difficulty === diff) && q.title.toLowerCase().includes(s.toLowerCase()));
  return (
    <>
      <div className="filters">
        <input className="input" placeholder="🔎 Search quizzes…" value={s} onChange={(e) => setS(e.target.value)} />
        <select className="input" value={cat} onChange={(e) => setCat(e.target.value)}><option value="">All categories</option>{categories.map((c) => <option key={c}>{c}</option>)}</select>
        <select className="input" value={diff} onChange={(e) => setDiff(e.target.value)}><option value="">All difficulties</option>{difficulties.map((d) => <option key={d}>{d}</option>)}</select>
        <button className="btn btn-outline" onClick={() => { setS(''); setCat(''); setDiff(''); }}>Clear</button>
      </div>
      {list.length ? <div className="grid">{(limit ? list.slice(0, limit) : list).map((q) => <QuizCard key={q.id} quiz={q} />)}</div> : <div className="card empty"><p>No quizzes match your filters. Try clearing them.</p></div>}
    </>
  );
}
export default function ExploreQuizzes() {
  return <div className="container page"><h1>Explore quizzes</h1><QuizBrowser /></div>;
}
