import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  // Add safety check for cart array
  const cartItemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🍧</span>
          Sweet Ice Delights
        </Link>

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
              <Link to="/cart" className="cart-link">
                🛒 Cart ({cartItemCount})
              </Link>
              <div className="auth-links">
                <Link to="/orders" className="auth-link">Orders</Link>
                <button onClick={logout} className="auth-link logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/register" className="auth-link">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
