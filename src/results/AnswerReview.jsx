const show = (q, v) => (v === null || v === undefined ? '—' : q.type === 'open' ? String(v) : q.options[Number(v)]);

export default function AnswerReview({ review }) {
  if (!review?.length) return <div className="card empty"><p>Detailed review is not available for this attempt.</p></div>;
  return (
    <div className="review">
      {review.map((q, i) => (
        <div key={q.qid} className={`card review-item ${q.userAnswer === null ? 'skip' : q.isCorrect ? 'ok' : 'bad'}`}>
          <div className="qhead"><b>Q{i + 1}. {q.text}</b><span className="badge">{q.userAnswer === null ? 'Unanswered' : q.isCorrect ? `+${q.marks}` : '0'}</span></div>
          <p>Your answer: <b>{show(q, q.userAnswer)}</b></p>
          {!q.isCorrect && <p>Correct answer: <b className="pass-text">{q.type === 'open' ? String(q.correctAnswer).split('|').join(' / ') : q.options[Number(q.correctAnswer)]}</b></p>}
          {q.explanation && <p className="explain">💡 {q.explanation}</p>}
        </div>
      ))}
    </div>
  );
}
