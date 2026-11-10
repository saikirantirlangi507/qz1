import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';
import { isLive } from '../services/quizService.js';
import { addResult, gradeAttempt, shuffle } from '../services/resultService.js';
import Timer from '../components/Timer.jsx';
import Loader from '../components/Loader.jsx';
import QuestionDisplay from './QuestionDisplay.jsx';
import QuizSubmission from './QuizSubmission.jsx';

export default function QuizPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { quizzes, notify, reload } = useQuiz();
  const nav = useNavigate();
  const quiz = quizzes.find((q) => q.id === id);
  const [run, setRun] = useState(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [confirm, setConfirm] = useState(false);
  const ref = useRef({}); ref.current = { answers, run };
  const done = useRef(false);

  useEffect(() => {
    if (!quiz || !isLive(quiz) || !quiz.questions.length) return;
    const qs = shuffle(quiz.questions).map((q) => ({ ...q, opts: q.type === 'mcq' ? shuffle(q.options.map((t, i) => ({ t, i }))) : [] }));
    setRun({ qs, start: Date.now(), endAt: Date.now() + quiz.duration * 60000 });
    setIdx(0); setAnswers({}); done.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!quiz || !isLive(quiz) || !quiz.questions.length)
    return <div className="container page"><div className="card empty"><h2>Quiz unavailable</h2><p>This quiz is inactive, a draft, or has no questions.</p><Link className="btn btn-primary" to="/explore">Browse quizzes</Link></div></div>;
  if (!run) return <Loader text="Preparing your quiz…" />;

  const submit = () => {
    if (done.current) return; done.current = true;
    const { answers: a, run: r } = ref.current;
    const secs = Math.min(Math.round((Date.now() - r.start) / 1000), quiz.duration * 60);
    const result = gradeAttempt(quiz, r.qs, a, secs, user);
    addResult(result); reload(); notify('Quiz submitted!');
    nav(`/result/${result.id}`, { replace: true });
  };
  const expire = () => { notify("Time's up! Submitting your quiz…", 'error'); submit(); };
  const answered = run.qs.filter((q) => { const v = answers[q.id]; return v !== undefined && String(v).trim() !== ''; }).length;
  const q = run.qs[idx];
  const has = (x) => answers[x.id] !== undefined && String(answers[x.id]).trim() !== '';

  return (
    <div className="container page quiz-layout">
      <div className="quiz-main">
        <div className="quiz-top"><h2>{quiz.title}</h2><span>Question {idx + 1} of {run.qs.length}</span></div>
        <div className="progress"><div style={{ width: `${(answered / run.qs.length) * 100}%` }} /></div>
        <QuestionDisplay q={q} index={idx} total={run.qs.length} value={answers[q.id]} onChange={(v) => setAnswers({ ...answers, [q.id]: v })} />
        <div className="quiz-nav">
          <button className="btn btn-outline" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>← Previous</button>
          {idx < run.qs.length - 1 ? <button className="btn btn-primary" onClick={() => setIdx(idx + 1)}>Next →</button> : <button className="btn btn-success" onClick={() => setConfirm(true)}>Submit Quiz</button>}
        </div>
      </div>
      <aside className="card quiz-side">
        <Timer endAt={run.endAt} onExpire={expire} />
        <p className="muted">{answered} / {run.qs.length} answered</p>
        <div className="qnav">{run.qs.map((x, i) => <button key={x.id} className={`${i === idx ? 'current' : ''} ${has(x) ? 'done' : ''}`} onClick={() => setIdx(i)}>{i + 1}</button>)}</div>
        <button className="btn btn-success block" onClick={() => setConfirm(true)}>Submit Quiz</button>
      </aside>
      <QuizSubmission open={confirm} answered={answered} total={run.qs.length} onConfirm={submit} onCancel={() => setConfirm(false)} />
    </div>
  );
}
