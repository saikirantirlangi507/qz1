export default function OpenEndedQuestion({ value, onChange }) {
  return <textarea className="input" rows={4} placeholder="Type your answer here…" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />;
}
