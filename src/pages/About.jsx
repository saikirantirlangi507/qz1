export default function About() {
  return (
    <div className="container page narrow">
      <h1>About Quiz Builder</h1>
      <div className="card"><p>Quiz Builder is a student-friendly quiz platform. Administrators create multiple-choice, true/false and open-ended quizzes, set time limits and publish them. Students practise, see instant scores with explanations, and track progress over time.</p></div>
      <div className="grid3">
        <div className="card"><h3>🎯 Practise</h3><p>Timed quizzes with randomised questions and options.</p></div>
        <div className="card"><h3>📈 Track</h3><p>History, averages and best scores at a glance.</p></div>
        <div className="card"><h3>🏆 Compete</h3><p>Climb the leaderboard with every quiz you complete.</p></div>
      </div>
    </div>
  );
}
