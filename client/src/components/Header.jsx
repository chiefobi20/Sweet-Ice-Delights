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
      <div className="header-content">
        <Link to="/" className="logo">
          🍧 Sweet Ice Delights
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/flavors" className="nav-link">Flavors</Link>
          <Link to="/about" className="nav-link">About</Link>

          {user ? (
            <>
              <Link to="/cart" className="nav-link cart-link">
                Cart ({cartItemCount})
              </Link>
              <Link to="/orders" className="nav-link">Orders</Link>
              <button onClick={logout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
