import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Shell, { adminLinks, userLinks } from './components/Sidebar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import CreateQuiz from './admin/CreateQuiz.jsx';
import ManageQuizzes from './admin/ManageQuizzes.jsx';
import ManageQuestions from './admin/ManageQuestions.jsx';
import ManageUsers from './admin/ManageUsers.jsx';
import QuizResults from './admin/QuizResults.jsx';
import Reports from './admin/Reports.jsx';
import AdminSettings from './admin/AdminSettings.jsx';
import UserDashboard from './user/UserDashboard.jsx';
import ExploreQuizzes, { QuizBrowser } from './user/ExploreQuizzes.jsx';
import QuizHistory from './user/QuizHistory.jsx';
import UserProfile from './user/UserProfile.jsx';
import Leaderboard from './user/Leaderboard.jsx';
import QuizPage from './quiz/QuizPage.jsx';
import ResultPage from './results/ResultPage.jsx';
import './App.css';

const Pub = ({ children }) => <>{children}<Footer /></>;
const Admin = ({ children }) => <ProtectedRoute role="admin"><Shell links={adminLinks}>{children}</Shell></ProtectedRoute>;
const Student = ({ children }) => <ProtectedRoute role="user"><Shell links={userLinks}>{children}</Shell></ProtectedRoute>;

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="app-body">
        <Routes>
          <Route path="/" element={<Pub><Home /></Pub>} />
          <Route path="/explore" element={<Pub><ExploreQuizzes /></Pub>} />
          <Route path="/about" element={<Pub><About /></Pub>} />
          <Route path="/contact" element={<Pub><Contact /></Pub>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<Admin><AdminDashboard /></Admin>} />
          <Route path="/admin/create" element={<Admin><CreateQuiz /></Admin>} />
          <Route path="/admin/edit/:id" element={<Admin><CreateQuiz key="edit" /></Admin>} />
          <Route path="/admin/quizzes" element={<Admin><ManageQuizzes /></Admin>} />
          <Route path="/admin/questions" element={<Admin><ManageQuestions /></Admin>} />
          <Route path="/admin/users" element={<Admin><ManageUsers /></Admin>} />
          <Route path="/admin/results" element={<Admin><QuizResults /></Admin>} />
          <Route path="/admin/reports" element={<Admin><Reports /></Admin>} />
          <Route path="/admin/settings" element={<Admin><AdminSettings /></Admin>} />

          <Route path="/dashboard" element={<Student><UserDashboard /></Student>} />
          <Route path="/dashboard/explore" element={<Student><h1>Explore quizzes</h1><QuizBrowser /></Student>} />
          <Route path="/dashboard/history" element={<Student><QuizHistory /></Student>} />
          <Route path="/dashboard/leaderboard" element={<Student><Leaderboard /></Student>} />
          <Route path="/dashboard/profile" element={<Student><UserProfile /></Student>} />
          <Route path="/leaderboard" element={<Navigate to="/dashboard/leaderboard" replace />} />

          <Route path="/quiz/:id" element={<ProtectedRoute role="user"><QuizPage /></ProtectedRoute>} />
          <Route path="/result/:id" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
