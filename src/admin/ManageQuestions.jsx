import { useState } from 'react';
import { useQuiz } from '../context/QuizContext.jsx';
import { patchQuiz } from '../services/quizService.js';
import { QuestionEditor, blankQ, validateQuestion } from './CreateQuiz.jsx';

export default function ManageQuestions() {
  const { quizzes, reload, notify } = useQuiz();
  const [qid, setQid] = useState(quizzes[0]?.id || '');
  const [edit, setEdit] = useState(null);
  const quiz = quizzes.find((q) => q.id === qid);
  const save = (questions, msg) => { patchQuiz(quiz.id, { questions }); reload(); notify(msg); };
  const commit = () => {
    const e = validateQuestion(edit); if (e) return notify(e, 'error');
    const exists = quiz.questions.some((x) => x.id === edit.id);
    save(exists ? quiz.questions.map((x) => (x.id === edit.id ? edit : x)) : [...quiz.questions, edit], exists ? 'Question updated.' : 'Question added.'); setEdit(null);
  };
  return (
    <>
      <h1>Manage questions</h1>
      <div className="card"><label className="field">Quiz<select className="input" value={qid} onChange={(e) => { setQid(e.target.value); setEdit(null); }}>{quizzes.map((q) => <option key={q.id} value={q.id}>{q.title}</option>)}</select></label></div>
      {quiz && (
        <>
          <div className="row between"><h2>{quiz.questions.length} questions</h2><button className="btn btn-primary" onClick={() => setEdit(blankQ())}>+ Add question</button></div>
          {edit && <><QuestionEditor q={edit} index={quiz.questions.findIndex((x) => x.id === edit.id) < 0 ? quiz.questions.length : quiz.questions.findIndex((x) => x.id === edit.id)} onChange={setEdit} /><div className="row"><button className="btn btn-primary" onClick={commit}>Save question</button><button className="btn btn-outline" onClick={() => setEdit(null)}>Cancel</button></div></>}
          {quiz.questions.map((q, i) => (
            <div className="card row between" key={q.id}>
              <div><b>{i + 1}. {q.text}</b><br /><small className="muted">{q.type === 'mcq' ? 'Multiple choice' : q.type === 'tf' ? 'True/False' : 'Open-ended'} · {q.marks} mark(s)</small></div>
              <div className="actions"><button className="btn btn-sm btn-outline" onClick={() => setEdit(q)}>Edit</button><button className="btn btn-sm btn-danger" onClick={() => save(quiz.questions.filter((x) => x.id !== q.id), 'Question deleted.')}>Delete</button></div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
