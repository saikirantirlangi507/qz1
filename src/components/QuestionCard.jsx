export default function QuestionCard({ index, total, marks, children }) {
  return (
    <div className="card question-card">
      <div className="qhead"><span>Question {index + 1} of {total}</span><span className="badge">{marks} {Number(marks) === 1 ? 'mark' : 'marks'}</span></div>
      {children}
    </div>
  );
}
