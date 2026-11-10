import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getQuizzes } from '../services/quizService.js';
import { getResults } from '../services/resultService.js';
import { getUsers } from '../services/authService.js';
import { uid } from '../services/storageService.js';

const QuizCtx = createContext(null);
export const useQuiz = () => useContext(QuizCtx);

export function QuizProvider({ children }) {
  const [v, setV] = useState(0);
  const [toasts, setToasts] = useState([]);
  const reload = useCallback(() => setV((x) => x + 1), []);
  const notify = useCallback((msg, type = 'success') => {
    const id = uid(); setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ quizzes: getQuizzes(), results: getResults(), users: getUsers(), reload, notify }), [v, reload, notify]);
  return (
    <QuizCtx.Provider value={value}>
      {children}
      <div className="toasts">{toasts.map((t) => <div key={t.id} className={`toast ${t.type}`}>{t.type === 'success' ? '✅' : '⚠️'} {t.msg}</div>)}</div>
    </QuizCtx.Provider>
  );
}
