import { Link } from 'react-router-dom';
import FlavorList from './FlavorList';

function Home() {
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
          <Link to="/contact" className="cta-button secondary">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="image-carousel-section">
        <h2>Our Delicious Creations</h2>
        <div className="image-carousel">
          <div className="carousel-track">
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop" alt="Colorful Italian Ice" />
              <p>Rainbow Italian Ice</p>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop" alt="Lemon Granita" />
              <p>Fresh Lemon Granita</p>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&h=300&fit=crop" alt="Strawberry Ice" />
              <p>Strawberry Delight</p>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop" alt="Blue Raspberry" />
              <p>Blue Raspberry</p>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop" alt="Orange Creamsicle" />
              <p>Orange Creamsicle</p>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop" alt="Cherry Italian Ice" />
              <p>Cherry Blast</p>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop" alt="Tropical Mix" />
              <p>Tropical Paradise</p>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop" alt="Grape Italian Ice" />
              <p>Grape Sensation</p>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop" alt="Mint Italian Ice" />
              <p>Cool Mint</p>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400&h=300&fit=crop" alt="Peach Italian Ice" />
              <p>Peachy Keen</p>
            </div>
          </div>
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
              View Flavors
            </Link>
            <Link to="/contact" className="cta-button secondary">
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
