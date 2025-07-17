import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div className="contact">
      <div className="page-header">
        <Link to="/" className="back-home-btn">← Home</Link>
        <h1>Contact Sweet Ice Delights</h1>
      </div>

      <div className="contact-content">
        {/* Contact Hero */}
        <section className="contact-hero">
          <h2>🍧 Get in Touch</h2>
          <p className="lead">
            We'd love to hear from you! Whether you have questions about our flavors, 
            want to place a special order, or just want to say hello, we're here to help.
          </p>
        </section>

        {/* Contact Information */}
        <section className="contact-info">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Phone</h3>
              <p>
                <a href="tel:+15551234356" className="contact-link">
                  (555) 123-GELATO
                </a>
              </p>
              <p className="contact-note">Call us for orders, questions, or just to chat!</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <h3>Email</h3>
              <p>
                <a href="mailto:hello@sweeticedelights.com" className="contact-link">
                  hello@sweeticedelights.com
                </a>
              </p>
              <p className="contact-note">Send us your questions or feedback</p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Visit Us</h3>
              <p>
                123 Gelato Street<br/>
                Sweet City, SC 12345<br/>
                United States
              </p>
              <p className="contact-note">Come taste the magic in person!</p>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="social-section">
          <h2>Follow Us on Social Media</h2>
          <p>Stay updated with our latest flavors, special offers, and sweet moments!</p>
          
          <div className="social-links">
            <a 
              href="https://instagram.com/sweeticedelights" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <div className="social-icon">📷</div>
              <span>@sweeticedelights</span>
              <p>Follow us on Instagram</p>
            </a>

            <a 
              href="https://facebook.com/sweeticedelights" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link facebook"
            >
              <div className="social-icon">📘</div>
              <span>Sweet Ice Delights</span>
              <p>Like us on Facebook</p>
            </a>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="contact-cta">
          <h2>Ready to Order?</h2>
          <p>Don't wait - treat yourself to some delicious Italian ice today!</p>
          <div className="cta-buttons">
            <Link to="/flavors" className="cta-button primary">
              View Our Flavors
            </Link>
            <Link to="/hours" className="cta-button secondary">
              Check Our Hours
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;