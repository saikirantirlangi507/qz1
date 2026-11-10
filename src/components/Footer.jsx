import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><h4>🎓 Quiz Builder</h4><p>Challenge your knowledge, one quiz at a time.</p></div>
        <div><h4>Quick links</h4><Link to="/explore">Explore Quizzes</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></div>
        <div><h4>Contact</h4><p>📧 support@quizbuilder.com</p><p>📞 +91 98765 43210</p><p>📍 Andhra Pradesh, India</p></div>
        <div><h4>Follow us</h4><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter / X</a><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></div>
      </div>
      <div className="copy">© {new Date().getFullYear()} Quiz Builder. All rights reserved.</div>
    </footer>
  );
}
