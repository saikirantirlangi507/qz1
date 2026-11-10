import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useQuiz } from '../context/QuizContext.jsx';

export default function QuizCard({ quiz }) {
  const { user } = useAuth();
  const { notify } = useQuiz();
  const nav = useNavigate();
  const start = () => {
    if (!user) { notify('Please log in to start a quiz.', 'error'); return nav('/login', { state: { from: `/quiz/${quiz.id}` } }); }
    if (user.role === 'admin') return notify('Admins cannot attempt quizzes. Use a student account.', 'error');
    nav(`/quiz/${quiz.id}`);
  };
  return (
    <div className="card quiz-card">
      <div className="qc-top"><span className="badge">{quiz.category}</span><span className={`badge diff ${quiz.difficulty.toLowerCase()}`}>{quiz.difficulty}</span></div>
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <div className="qc-meta"><span>📝 {quiz.questions.length} questions</span><span>⏱ {quiz.duration} min</span></div>
      <button className="btn btn-primary" onClick={start}>Start Quiz</button>
    </div>
  );
}
