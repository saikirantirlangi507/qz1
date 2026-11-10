export default function MCQQuestion({ q, value, onChange }) {
  return (
    <div className="options">
      {q.opts.map((o, k) => (
        <button key={o.i} className={`option ${value === o.i ? 'selected' : ''}`} onClick={() => onChange(o.i)}>
          <b>{String.fromCharCode(65 + k)}</b> {o.t}
        </button>
      ))}
    </div>
  );
}
