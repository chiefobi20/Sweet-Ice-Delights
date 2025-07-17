import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Sweet Ice Delights. Made with ❤️ and lots of ice!</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/hours">Hours</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
