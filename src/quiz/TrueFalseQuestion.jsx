export default function TrueFalseQuestion({ value, onChange }) {
  return (
    <div className="options tf">
      {['True', 'False'].map((t, i) => <button key={t} className={`option ${value === i ? 'selected' : ''}`} onClick={() => onChange(i)}>{t}</button>)}
    </div>
  );
}
