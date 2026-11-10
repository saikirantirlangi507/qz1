import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext.jsx';
import { getQuiz, saveQuiz } from '../services/quizService.js';
import { uid } from '../services/storageService.js';
import { categories, difficulties } from '../data/categories.js';

export const blankQ = (type = 'mcq') => ({ id: uid(), type, text: '', options: type === 'mcq' ? ['', '', '', ''] : [], correct: type === 'open' ? '' : 0, marks: 1, explanation: '' });

export function validateQuestion(q) {
  if (!q.text.trim()) return 'Every question needs text.';
  if (!(Number(q.marks) > 0)) return 'Marks must be greater than 0.';
  if (q.type === 'mcq' && q.options.some((o) => !o.trim())) return 'Fill in all four options.';
  if (q.type === 'open' && !String(q.correct).trim()) return 'Add at least one accepted answer for open-ended questions.';
  return '';
}

export function QuestionEditor({ q, index, onChange, onRemove }) {
  const set = (p) => onChange({ ...q, ...p });
  const setType = (t) => { const b = blankQ(t); set({ type: t, options: b.options, correct: b.correct }); };
  return (
    <div className="card q-editor">
      <div className="qhead"><b>Question {index + 1}</b>{onRemove && <button type="button" className="btn btn-sm btn-danger" onClick={onRemove}>Remove</button>}</div>
      <div className="grid2">
        <label className="field">Type<select className="input" value={q.type} onChange={(e) => setType(e.target.value)}><option value="mcq">Multiple choice</option><option value="tf">True / False</option><option value="open">Open-ended</option></select></label>
        <label className="field">Marks<input className="input" type="number" min="1" value={q.marks} onChange={(e) => set({ marks: e.target.value })} /></label>
      </div>
      <label className="field">Question<textarea className="input" rows={2} value={q.text} onChange={(e) => set({ text: e.target.value })} /></label>
      {q.type === 'mcq' && q.options.map((o, i) => (
        <div className="opt-row" key={i}>
          <input type="radio" name={`c-${q.id}`} checked={Number(q.correct) === i} onChange={() => set({ correct: i })} title="Mark as correct" />
          <input className="input" placeholder={`Option ${String.fromCharCode(65 + i)}`} value={o} onChange={(e) => set({ options: q.options.map((x, k) => (k === i ? e.target.value : x)) })} />
        </div>
      ))}
      {q.type === 'tf' && <div className="opt-row">{['True', 'False'].map((t, i) => <label key={t}><input type="radio" name={`c-${q.id}`} checked={Number(q.correct) === i} onChange={() => set({ correct: i })} /> {t}</label>)}<small className="muted">Select the correct answer</small></div>}
      {q.type === 'open' && <label className="field">Accepted answers (separate alternatives with |)<input className="input" value={q.correct} onChange={(e) => set({ correct: e.target.value })} placeholder="e.g. photosynthesis|photo synthesis" /></label>}
      {q.type === 'mcq' && <small className="muted">The selected radio button marks the correct option.</small>}
      <label className="field">Explanation (optional)<input className="input" value={q.explanation} onChange={(e) => set({ explanation: e.target.value })} /></label>
    </div>
  );
}

export default function CreateQuiz() {
  const { id } = useParams();
  const nav = useNavigate();
  const { notify, reload } = useQuiz();
  const existing = id ? getQuiz(id) : null;
  const [quiz, setQuiz] = useState(existing || { id: uid(), title: '', description: '', category: categories[0], difficulty: 'Easy', duration: 10, passPercent: 40, status: 'draft', active: true, createdAt: new Date().toISOString(), questions: [blankQ()] });
  const set = (p) => setQuiz({ ...quiz, ...p });
  if (id && !existing) return <div className="card empty"><p>Quiz not found.</p></div>;

  const save = (status) => {
    if (quiz.title.trim().length < 3) return notify('Enter a quiz title (min 3 characters).', 'error');
    if (!quiz.description.trim()) return notify('Enter a description.', 'error');
    if (!(Number(quiz.duration) > 0)) return notify('Duration must be at least 1 minute.', 'error');
    if (status === 'published' && !quiz.questions.length) return notify('Add at least one question before publishing.', 'error');
    for (const q of quiz.questions) { const e = validateQuestion(q); if (e) return notify(e, 'error'); }
    saveQuiz({ ...quiz, title: quiz.title.trim(), duration: Number(quiz.duration), passPercent: Number(quiz.passPercent), status });
    reload(); notify(status === 'published' ? 'Quiz published!' : 'Draft saved.'); nav('/admin/quizzes');
  };
  const total = quiz.questions.reduce((s, q) => s + Number(q.marks || 0), 0);
  return (
    <>
      <h1>{existing ? 'Edit quiz' : 'Create new quiz'}</h1>
      <div className="card">
        <label className="field">Title<input className="input" value={quiz.title} onChange={(e) => set({ title: e.target.value })} /></label>
        <label className="field">Description<textarea className="input" rows={3} value={quiz.description} onChange={(e) => set({ description: e.target.value })} /></label>
        <div className="grid4">
          <label className="field">Category<select className="input" value={quiz.category} onChange={(e) => set({ category: e.target.value })}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="field">Difficulty<select className="input" value={quiz.difficulty} onChange={(e) => set({ difficulty: e.target.value })}>{difficulties.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="field">Duration (minutes)<input className="input" type="number" min="1" value={quiz.duration} onChange={(e) => set({ duration: e.target.value })} /></label>
          <label className="field">Pass mark (%)<input className="input" type="number" min="1" max="100" value={quiz.passPercent} onChange={(e) => set({ passPercent: e.target.value })} /></label>
        </div>
      </div>
      <h2>Questions ({quiz.questions.length}) · {total} marks</h2>
      {quiz.questions.map((q, i) => <QuestionEditor key={q.id} q={q} index={i} onChange={(nq) => set({ questions: quiz.questions.map((x) => (x.id === q.id ? nq : x)) })} onRemove={() => set({ questions: quiz.questions.filter((x) => x.id !== q.id) })} />)}
      <div className="row">
        {[['mcq', '+ Multiple choice'], ['tf', '+ True / False'], ['open', '+ Open-ended']].map(([t, l]) => <button key={t} className="btn btn-outline" onClick={() => set({ questions: [...quiz.questions, blankQ(t)] })}>{l}</button>)}
      </div>
      <div className="row sticky-actions">
        <button className="btn btn-outline" onClick={() => save('draft')}>Save as draft</button>
        <button className="btn btn-primary" onClick={() => save('published')}>Publish quiz</button>
        <button className="btn btn-outline" onClick={() => nav('/admin/quizzes')}>Cancel</button>
      </div>
    </>
  );
}
