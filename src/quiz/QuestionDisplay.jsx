import QuestionCard from '../components/QuestionCard.jsx';
import MCQQuestion from './MCQQuestion.jsx';
import TrueFalseQuestion from './TrueFalseQuestion.jsx';
import OpenEndedQuestion from './OpenEndedQuestion.jsx';

export default function QuestionDisplay({ q, index, total, value, onChange }) {
  return (
    <QuestionCard index={index} total={total} marks={q.marks}>
      <h2 className="qtext">{q.text}</h2>
      {q.type === 'mcq' && <MCQQuestion q={q} value={value} onChange={onChange} />}
      {q.type === 'tf' && <TrueFalseQuestion value={value} onChange={onChange} />}
      {q.type === 'open' && <OpenEndedQuestion value={value} onChange={onChange} />}
    </QuestionCard>
  );
}
