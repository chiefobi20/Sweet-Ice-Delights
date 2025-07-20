function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sweet Ice Delights</h3>
          <p>Authentic Italian Ice Made Fresh Daily</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/flavors">Flavors</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📍 123 Main Street, City, State 12345</p>
          <p>📞 (555) 123-4567</p>
          <p>✉️ info@sweeticedelights.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Sweet Ice Delights. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
