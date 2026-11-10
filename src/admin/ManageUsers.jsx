import { useState } from 'react';
import { useQuiz } from '../context/QuizContext.jsx';
import { deleteUser, updateUser } from '../services/authService.js';
import ConfirmationModal from '../components/ConfirmationModal.jsx';

export default function ManageUsers() {
  const { users, results, reload, notify } = useQuiz();
  const [del, setDel] = useState(null);
  const [s, setS] = useState('');
  const list = users.filter((u) => u.role === 'user' && (u.name + u.email).toLowerCase().includes(s.toLowerCase()));
  return (
    <>
      <h1>Manage users</h1>
      <input className="input" placeholder="🔎 Search users…" value={s} onChange={(e) => setS(e.target.value)} />
      <div className="card table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Joined</th><th>Attempts</th><th>Avg %</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {list.map((u) => {
          const rs = results.filter((r) => r.userId === u.id);
          return <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{new Date(u.joined).toLocaleDateString()}</td><td>{rs.length}</td><td>{rs.length ? Math.round(rs.reduce((a, r) => a + r.percent, 0) / rs.length) : '—'}</td>
            <td><span className={`badge ${u.blocked ? 'bad' : 'ok'}`}>{u.blocked ? 'Blocked' : 'Active'}</span></td>
            <td className="actions"><button className="btn btn-sm btn-outline" onClick={() => { updateUser(u.id, { blocked: !u.blocked }); reload(); notify(u.blocked ? 'User unblocked.' : 'User blocked.'); }}>{u.blocked ? 'Unblock' : 'Block'}</button><button className="btn btn-sm btn-danger" onClick={() => setDel(u)}>Delete</button></td></tr>;
        })}
      </tbody></table>{!list.length && <p className="empty">No users found.</p>}</div>
      <ConfirmationModal open={!!del} danger title="Delete user?" confirmText="Delete" onConfirm={() => { deleteUser(del.id); reload(); notify('User deleted.'); setDel(null); }} onCancel={() => setDel(null)}>Delete {del?.name} and all of their results?</ConfirmationModal>
    </>
  );
}
