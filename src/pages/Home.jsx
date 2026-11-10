import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { isLive } from '../services/quizService.js';
import QuizCard from '../components/QuizCard.jsx';

export default function Home() {
  const { quizzes, users, results } = useQuiz();
  const { user } = useAuth();
  const nav = useNavigate();
  const live = quizzes.filter(isLive);
  const answered = results.reduce((s, r) => s + r.correct + r.incorrect, 0);
  const startQuiz = () => nav(user ? (user.role === 'admin' ? '/admin' : '/dashboard/explore') : '/register');
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1>Challenge Your Knowledge, One Quiz at a Time!</h1>
            <p>Quiz Builder lets students practise with timed quizzes, track their scores and climb the leaderboard, while admins create and publish their own quizzes in minutes.</p>
            <div className="row">
              <button className="btn btn-primary btn-lg" onClick={startQuiz}>Start Quiz</button>
              <Link className="btn btn-outline-light btn-lg" to="/explore">Explore Quizzes</Link>
            </div>
          </div>
          <img className="hero-img" src="/images/quiz-banner.png" alt="Quiz Builder banner" />
        </div>
      </section>
      <section className="container section">
        <h2 className="section-title">Featured quizzes</h2>
        <div className="grid">{live.slice(0, 3).map((q) => <QuizCard key={q.id} quiz={q} />)}</div>
        <div className="row center"><Link className="btn btn-outline" to="/explore">View all quizzes</Link></div>
      </section>
      <section className="stats-band">
        <div className="container grid3">
          <div><b>{live.length}</b><span>Total Quizzes</span></div>
          <div><b>{users.filter((u) => u.role === 'user').length}</b><span>Registered Users</span></div>
          <div><b>{answered}</b><span>Questions Answered</span></div>
        </div>
      </section>
    </>
  );
}
