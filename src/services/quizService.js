import { get, set } from './storageService.js';

export const getQuizzes = () => get('qb_quizzes', []);
export const getQuiz = (id) => getQuizzes().find((q) => q.id === id);
export function saveQuiz(quiz) {
  const all = getQuizzes(); const i = all.findIndex((x) => x.id === quiz.id);
  if (i >= 0) all[i] = quiz; else all.push(quiz);
  set('qb_quizzes', all);
}
export const deleteQuiz = (id) => set('qb_quizzes', getQuizzes().filter((q) => q.id !== id));
export const patchQuiz = (id, p) => set('qb_quizzes', getQuizzes().map((q) => (q.id === id ? { ...q, ...p } : q)));
export const totalMarks = (q) => q.questions.reduce((s, x) => s + Number(x.marks || 0), 0);
export const isLive = (q) => q.status === 'published' && q.active;
