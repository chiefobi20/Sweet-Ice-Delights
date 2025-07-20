import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about bg-white/95 backdrop-blur-md min-h-screen py-8">
      <div className="container max-w-4xl mx-auto">
        <div className="page-header text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">About Sweet Ice Delights</h1>
        </div>

        <div className="about-content bg-white/90 backdrop-blur-md rounded-xl p-8 shadow-lg text-gray-800">
          {/* Hero Section */}
          <section className="about-hero">
            <div className="about-hero-content">
              <h2>🍧 Our Story</h2>
              <p className="lead">
                Welcome to Sweet Ice Delights, where authentic Italian ice meets modern convenience.
                Since our founding, we've been dedicated to bringing you the refreshing taste of
                traditional Italian gelato and granita, made fresh daily with the finest ingredients.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              At Sweet Ice Delights, we believe that life's sweetest moments deserve the perfect treat.
              Our mission is to craft authentic Italian ice that brings joy, refreshment, and a taste
              of Italy to every customer. We're committed to using only the finest natural ingredients,
              traditional recipes, and innovative flavors that celebrate both heritage and creativity.
            </p>
          </section>

          {/* Values Section */}
          <br></br>
          <section className="about-section">
            <h2>What Makes Us Special</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🌟</div>
                <h3>Premium Quality</h3>
                <p>
                  We source the finest natural ingredients and use traditional Italian methods
                  to ensure every scoop meets our high standards of excellence.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">❄️</div>
                <h3>Fresh Daily</h3>
                <p>
                  Every batch is made fresh daily in small quantities to guarantee the perfect
                  texture, flavor, and quality you deserve.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">🇮🇹</div>
                <h3>Authentic Tradition</h3>
                <p>
                  Our recipes are inspired by generations of Italian gelato masters, bringing
                  you the true taste of Italy in every bite.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">🌱</div>
                <h3>Natural Ingredients</h3>
                <p>
                  No artificial preservatives, colors, or flavors. Just pure, natural ingredients
                  that you can feel good about enjoying.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <br></br>
          <section className="about-section">
            <h2>Meet Our Team</h2>
            <p>
              Our passionate team of artisans and flavor experts work tirelessly to bring you
              the best Italian ice experience. From our master gelato makers to our friendly
              customer service team, everyone at Sweet Ice Delights shares a commitment to
              excellence and customer satisfaction.
            </p>
          </section>


          {/* Call to Action */}
          <section className="about-cta">
            <h2>Ready to Experience Sweet Ice Delights?</h2>
            <p>
              Come visit us today or order online for pickup. We can't wait to serve you
              the most delicious Italian ice you've ever tasted!
            </p>
            <br></br>
            <div className="cta-buttons">
              <Link to="/flavors" className="cta-button primary">
                View Our Flavors
              </Link>
              <br></br>
              <Link to="/contact" className="cta-button secondary">
                Get in Touch
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
