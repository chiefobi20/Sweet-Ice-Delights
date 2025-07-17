import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🍧 Sweet Ice Delights
        </Link>

        <nav className="nav">
          <Link to="/flavors">Flavors</Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart" className="cart-link">
                Cart ({cartItemCount})
              </Link>
              <Link to="/orders">My Orders</Link>
              <span>Hello, {user?.username}!</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
