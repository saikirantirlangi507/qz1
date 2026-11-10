import { useEffect, useRef, useState } from 'react';

const calc = (endAt) => Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
export default function Timer({ endAt, onExpire }) {
  const [left, setLeft] = useState(calc(endAt));
  const cb = useRef(onExpire); cb.current = onExpire;
  useEffect(() => {
    const t = setInterval(() => { const l = calc(endAt); setLeft(l); if (l <= 0) { clearInterval(t); cb.current(); } }, 250);
    return () => clearInterval(t);
  }, [endAt]);
  const m = String(Math.floor(left / 60)).padStart(2, '0'), s = String(left % 60).padStart(2, '0');
  return <div className={`timer ${left <= 60 ? 'danger' : ''}`}>⏱ {m}:{s}</div>;
}
