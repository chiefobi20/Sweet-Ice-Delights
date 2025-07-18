import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🍧</span>
          Sweet Ice Delights
        </div>

        <nav className="main-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/flavors" className="nav-link">Flavors</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/hours" className="nav-link">Hours</Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.name || user.email}!</span>
              <div className="auth-links">
                <button onClick={logout} className="auth-link logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link">Login</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
