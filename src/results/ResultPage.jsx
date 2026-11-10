import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';
import ScoreCard from './ScoreCard.jsx';
import AnswerReview from './AnswerReview.jsx';

export default function ResultPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { results } = useQuiz();
  const [showReview, setShow] = useState(false);
  const r = results.find((x) => x.id === id);
  if (!r || (user.role !== 'admin' && r.userId !== user.id)) return <div className="container page"><div className="card empty"><h2>Result not found</h2><Link className="btn btn-primary" to="/dashboard">Go to dashboard</Link></div></div>;
  return (
    <div className="container page narrow">
      <h1>{r.quizTitle}</h1>
      <p className="muted">{r.userName} · {new Date(r.date).toLocaleString()}</p>
      <ScoreCard r={r} />
      <div className="row center">
        <button className="btn btn-primary" onClick={() => setShow(!showReview)}>{showReview ? 'Hide Review' : 'Review Answers'}</button>
        {user.role === 'user' && <Link className="btn btn-outline" to={`/quiz/${r.quizId}`}>Retake Quiz</Link>}
        <Link className="btn btn-outline" to={user.role === 'admin' ? '/admin/results' : '/dashboard'}>Back</Link>
      </div>
      {showReview && <AnswerReview review={r.review} />}
    </div>
  );
}
