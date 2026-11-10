import { defaultQuizzes } from '../data/defaultQuizzes.js';
import { defaultUsers } from '../data/defaultUsers.js';

export const get = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } };
export const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));
export const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36);

const demoResults = () => {
  const rows = [['u1', 'Ananya Rao', 0, 90], ['u1', 'Ananya Rao', 3, 80], ['u1', 'Ananya Rao', 1, 70], ['u2', 'Rahul Verma', 0, 80], ['u2', 'Rahul Verma', 2, 60], ['u3', 'Priya Nair', 4, 50], ['u3', 'Priya Nair', 3, 100], ['u3', 'Priya Nair', 0, 70]];
  return rows.map(([userId, userName, qi, p], i) => {
    const qz = defaultQuizzes[qi]; const total = qz.questions.length; const correct = Math.round((total * p) / 100);
    return { id: 'seed' + i, userId, userName, quizId: qz.id, quizTitle: qz.title, category: qz.category, score: correct, total, correct, incorrect: total - correct, unanswered: 0, percent: p, passed: p >= qz.passPercent, timeTaken: 120 + i * 37, date: new Date(Date.now() - i * 86400000).toISOString(), review: [] };
  });
};

export function seed(force = false) {
  if (force || !localStorage.getItem('qb_seeded')) {
    set('qb_users', defaultUsers); set('qb_quizzes', defaultQuizzes); set('qb_results', demoResults()); set('qb_messages', []);
    localStorage.setItem('qb_seeded', '1');
  }
}
export function resetAll() { localStorage.removeItem('qb_session'); seed(true); }
