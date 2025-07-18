import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FlavorList({ limit, showViewAll = false }) {
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const response = await fetch('/api/flavors');
        if (!response.ok) {
          throw new Error('Failed to fetch flavors');
        }
        const data = await response.json();

        // Apply limit if specified
        const displayFlavors = limit ? data.slice(0, limit) : data;
        setFlavors(displayFlavors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlavors();
  }, [limit]);

  if (loading) return <div>Loading flavors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flavor-list">
      {!limit && (
        <div className="page-header">
          <h2>Our Delicious Flavors</h2>
        </div>
      )}

      <div className="flavors-grid">
        {flavors.map(flavor => (
          <div key={flavor.id} className="flavor-card">
            <h3>{flavor.name}</h3>
            <p className="flavor-description">{flavor.description}</p>
            <p className="price">${(flavor.price_cents / 100).toFixed(2)}</p>
            <div className="flavor-info">
              <span className="availability">
                {flavor.available ? '✅ Available' : '❌ Unavailable'}
              </span>
            </div>
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
