import { Link } from 'react-router-dom';

function Hours() {
  return (
    <div className="hours">
      <div className="page-header">
        <h1>Store Hours</h1>
      </div>

      <div className="hours-content">
        {/* Hours Hero */}
        <section className="hours-hero">
          <h2>🕒 When We're Open</h2>
          <p className="lead">
            We're here to serve you fresh Italian ice throughout the week!
            Come visit us during these hours for the best selection and freshest treats.
          </p>
        </section>

        {/* Hours Schedule */}
        <section className="hours-schedule">
          <div className="schedule-card">
            <h3>📅 Weekly Schedule</h3>
            <div className="hours-list">
              <div className="hours-item">
                <span className="day">Monday - Thursday</span>
                <span className="time">11:00 AM - 9:00 PM</span>
              </div>
              <div className="hours-item weekend">
                <span className="day">Friday - Saturday</span>
                <span className="time">11:00 AM - 10:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="day">Sunday</span>
                <span className="time">12:00 PM - 8:00 PM</span>
              </div>
            </div>
          </div>

          <div className="hours-info">
            <div className="info-card">
              <h4>🌟 Best Times to Visit</h4>
              <ul>
                <li><strong>Weekday Afternoons:</strong> Less crowded, full flavor selection</li>
                <li><strong>Weekend Evenings:</strong> Perfect for date nights and family outings</li>
                <li><strong>Sunday Afternoons:</strong> Great for a relaxing weekend treat</li>
              </ul>
            </div>

            <div className="info-card">
              <h4>📞 Special Hours & Holidays</h4>
              <p>
                Hours may vary during holidays and special events.
                Call us at <a href="tel:+15551234356">(555) 123-GELATO</a>
                or check our social media for any updates!
              </p>
            </div>
          </div>
        </section>

        {/* Location Info */}
        <section className="location-reminder">
          <h3>📍 Find Us Here</h3>
          <div className="location-details">
            <p>
              123 Gelato Street<br/>
              Sweet City, SC 12345<br/>
              United States
            </p>
            <div className="location-actions">
              <Link to="/contact" className="cta-button secondary">
                Get Directions
              </Link>
              <Link to="/flavors" className="cta-button primary">
                Order Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Hours;
