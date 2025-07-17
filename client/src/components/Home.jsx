import { Link } from 'react-router-dom';
import FlavorList from './FlavorList';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Sweet Ice Delights</h1>
        <p className="tagline">🍧 Authentic Italian Ice Made Fresh Daily 🍧</p>
        <p className="description">
          Experience the refreshing taste of traditional Italian ice, crafted with
          the finest ingredients and served with love since day one.
        </p>

        <div className="hero-actions">
          <Link to="/flavors" className="cta-button primary">
            View All Flavors
          </Link>
          {!isAuthenticated && (
            <Link to="/register" className="cta-button secondary">
              Join Sweet Ice Family
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>Premium Quality</h3>
            <p>Made with the finest natural ingredients and no artificial preservatives</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❄️</div>
            <h3>Fresh Daily</h3>
            <p>Every batch is made fresh daily to ensure the perfect texture and taste</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Quick Service</h3>
            <p>Order online and pick up in minutes, or enjoy in our cozy shop</p>
          </div>
        </div>
      </section>

      {/* Popular Flavors Preview */}
      <section className="popular-flavors">
        <h2>Our Most Popular Flavors</h2>
        <p>Discover why these classics keep our customers coming back for more!</p>
        <FlavorList limit={3} showViewAll={true} />
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Cool Down?</h2>
          <p>Beat the heat with our refreshing Italian ice. Perfect for any time of day!</p>
          <div className="cta-buttons">
            <Link to="/flavors" className="cta-button primary">
              Order Now
            </Link>
            {isAuthenticated && (
              <Link to="/orders" className="cta-button secondary">
                View My Orders
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
