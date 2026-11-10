import { get, set, uid } from './storageService.js';
import { totalMarks } from './quizService.js';

export const getResults = () => get('qb_results', []);
export const getResult = (id) => getResults().find((r) => r.id === id);
export const userResults = (userId) => getResults().filter((r) => r.userId === userId).sort((a, b) => new Date(b.date) - new Date(a.date));
export const addResult = (r) => set('qb_results', [...getResults(), r]);

// MCQ/TF answers are the ORIGINAL option index; open-ended answers are matched (case-insensitive)
// against the accepted answers stored in `correct`, separated by "|".
export function gradeAttempt(quiz, questions, answers, timeTaken, user) {
  let score = 0, correct = 0, incorrect = 0, unanswered = 0;
  const review = questions.map((q) => {
    const a = answers[q.id];
    const has = a !== undefined && a !== null && String(a).trim() !== '';
    let ok = false;
    if (has) ok = q.type === 'open' ? String(q.correct).split('|').some((x) => x.trim().toLowerCase() === String(a).trim().toLowerCase()) : Number(a) === Number(q.correct);
    if (!has) unanswered++; else if (ok) { correct++; score += Number(q.marks); } else incorrect++;
    return { qid: q.id, type: q.type, text: q.text, options: q.type === 'tf' ? ['True', 'False'] : q.options, userAnswer: has ? a : null, correctAnswer: q.correct, isCorrect: ok, marks: Number(q.marks), explanation: q.explanation || '' };
  });
  const total = totalMarks({ questions });
  const percent = total ? Math.round((score / total) * 100) : 0;
  return { id: uid(), userId: user.id, userName: user.name, quizId: quiz.id, quizTitle: quiz.title, category: quiz.category, score, total, correct, incorrect, unanswered, percent, passed: percent >= (quiz.passPercent ?? 40), timeTaken, date: new Date().toISOString(), review };
}

export function quizStats(quizzes, results) {
  return quizzes.map((q) => {
    const rs = results.filter((r) => r.quizId === q.id);
    return { id: q.id, title: q.title, attempts: rs.length, avg: rs.length ? Math.round(rs.reduce((s, r) => s + r.percent, 0) / rs.length) : 0, high: rs.length ? Math.max(...rs.map((r) => r.percent)) : 0 };
  });
}
export function leaderboard(results) {
  const m = {};
  results.forEach((r) => { const e = (m[r.userId] ||= { userId: r.userId, name: r.userName, points: 0, quizzes: 0, highest: 0 }); e.points += r.score; e.quizzes++; e.highest = Math.max(e.highest, r.percent); });
  return Object.values(m).sort((a, b) => b.points - a.points || b.highest - a.highest);
}
export const fmtTime = (s) => `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;
export const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
