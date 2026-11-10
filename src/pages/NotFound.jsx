import { Link } from 'react-router-dom';
export default function NotFound() {
  return <div className="container page"><div className="card empty"><h1>404</h1><p>We could not find that page.</p><Link className="btn btn-primary" to="/">Back to home</Link></div></div>;
}
