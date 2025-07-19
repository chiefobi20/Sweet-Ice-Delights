import { Link } from 'react-router-dom'
import FlavorList from './FlavorList'

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Sweet Ice Delights</h1>
          <p>Authentic Italian Ice Made Fresh Daily</p>
          <Link to="/flavors" className="cta-button">
            View Our Flavors
          </Link>
        </div>
      </section>

      <section className="featured-flavors">
        <div className="container">
          <h2>Featured Flavors</h2>
          <FlavorList limit={6} />
          <div className="view-all">
            <Link to="/flavors" className="view-all-btn">
              View All Flavors
            </Link>
          </div>
        </div>
      </section>

      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <h2>About Sweet Ice Delights</h2>
            <p>
              We bring you authentic Italian ice made with traditional recipes
              and the finest ingredients. Every batch is crafted with love and
              attention to detail.
            </p>
            <Link to="/about" className="learn-more-btn">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
