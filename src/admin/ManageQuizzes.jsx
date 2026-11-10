import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext.jsx';
import { deleteQuiz, patchQuiz } from '../services/quizService.js';
import ConfirmationModal from '../components/ConfirmationModal.jsx';

export default function ManageQuizzes() {
  const { quizzes, results, reload, notify } = useQuiz();
  const [del, setDel] = useState(null);
  const nav = useNavigate();
  const toggle = (q) => { patchQuiz(q.id, { active: !q.active }); reload(); notify(q.active ? 'Quiz deactivated.' : 'Quiz activated.'); };
  const publish = (q) => {
    if (!q.questions.length) return notify('Add questions before publishing.', 'error');
    patchQuiz(q.id, { status: 'published' }); reload(); notify('Quiz published!');
  };
  const remove = () => { deleteQuiz(del.id); reload(); notify('Quiz deleted.'); setDel(null); };
  return (
    <>
      <div className="row between"><h1>Manage quizzes</h1><Link className="btn btn-primary" to="/admin/create">+ New quiz</Link></div>
      <div className="card table-wrap"><table><thead><tr><th>Title</th><th>Category</th><th>Level</th><th>Questions</th><th>Attempts</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {quizzes.map((q) => (
          <tr key={q.id}><td>{q.title}</td><td>{q.category}</td><td>{q.difficulty}</td><td>{q.questions.length}</td><td>{results.filter((r) => r.quizId === q.id).length}</td>
            <td><span className={`badge ${q.status === 'published' && q.active ? 'ok' : 'bad'}`}>{q.status === 'draft' ? 'Draft' : q.active ? 'Active' : 'Inactive'}</span></td>
            <td className="actions">
              <button className="btn btn-sm btn-outline" onClick={() => nav(`/admin/edit/${q.id}`)}>Edit</button>
              {q.status === 'draft' ? <button className="btn btn-sm btn-primary" onClick={() => publish(q)}>Publish</button> : <button className="btn btn-sm btn-outline" onClick={() => toggle(q)}>{q.active ? 'Deactivate' : 'Activate'}</button>}
              <button className="btn btn-sm btn-danger" onClick={() => setDel(q)}>Delete</button>
            </td></tr>
        ))}
      </tbody></table>{!quizzes.length && <p className="empty">No quizzes yet.</p>}</div>
      <ConfirmationModal open={!!del} danger title="Delete quiz?" confirmText="Delete" onConfirm={remove} onCancel={() => setDel(null)}>Delete “{del?.title}”? Past results stay in the records.</ConfirmationModal>
    </>
  );
}
