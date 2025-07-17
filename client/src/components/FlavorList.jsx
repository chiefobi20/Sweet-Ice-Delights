import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function FlavorList({ limit, showViewAll = false }) {
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    console.log('🔄 FlavorList useEffect starting...');

    const fetchFlavors = async () => {
      try {
        console.log('🔍 About to fetch /api/flavors');
        const response = await fetch('/api/flavors');
        console.log('📡 Response:', response.status, response.statusText);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Data received:', data);

          const displayFlavors = limit ? data.slice(0, limit) : data;
          setFlavors(displayFlavors);
          console.log('🎯 Flavors set to:', displayFlavors);
        } else {
          console.error('❌ Response not ok:', response.status);
          setError(`Failed to load flavors: ${response.status}`);
        }
      } catch (err) {
        console.error('💥 Fetch error:', err);
        setError(`Network error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFlavors();
  }, [limit]);

  if (loading) {
    return (
      <div className="flavor-list">
        <div className="loading">Loading delicious flavors... 🍧</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flavor-list">
        <div className="error">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (flavors.length === 0) {
    return (
      <div className="flavor-list">
        <div className="no-flavors">
          <h3>No flavors available right now</h3>
          <p>Check back soon for fresh Italian ice!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flavor-list">
      {!limit && (
        <div className="page-header">
          <Link to="/" className="back-home-btn">← Back to Home</Link>
          <h2>Our Delicious Flavors</h2>
        </div>
      )}

      <div className="flavors-grid">
        {flavors.map(flavor => (
          <div key={flavor.id} className="flavor-card">
            <h3>{flavor.name}</h3>
            <p className="flavor-description">{flavor.description}</p>
            <p className="price">${(flavor.price_cents / 100).toFixed(2)}</p>
            <button
              onClick={() => addToCart(flavor)}
              className="add-to-cart-btn"
              disabled={!flavor.available}
            >
              {flavor.available ? 'Add to Cart' : 'Unavailable'}
            </button>
          </div>
        ))}
      </div>

      {showViewAll && (
        <div className="view-all-section">
          <Link to="/flavors" className="view-all-btn">
            View All Flavors →
          </Link>
        </div>
      )}
    </div>
  );
}

export default FlavorList;
