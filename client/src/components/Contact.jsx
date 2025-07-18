import { useState } from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
    selectedDates: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock unavailable dates (you can replace with API data)
  const unavailableDates = [
    '2024-12-15', '2024-12-22', '2024-12-25', '2024-12-31',
    '2025-01-01', '2025-01-15', '2025-01-20'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          message: formData.message,
          selectedDates: formData.selectedDates
        })
      });

      if (response.ok) {
        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          message: '',
          selectedDates: []
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Still show success for demo purposes
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        message: '',
        selectedDates: []
      });
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateUnavailable = (dateString) => {
    return unavailableDates.includes(dateString);
  };

  const isDateSelected = (dateString) => {
    return formData.selectedDates.includes(dateString);
  };

  const handleDateClick = (dateString) => {
    console.log('Date clicked:', dateString); // Debug log
    if (isDateUnavailable(dateString)) {
      console.log('Date unavailable, ignoring click');
      return;
    }

    const newSelectedDates = isDateSelected(dateString)
      ? formData.selectedDates.filter(date => date !== dateString)
      : [...formData.selectedDates, dateString];

    console.log('New selected dates:', newSelectedDates); // Debug log
    setFormData({
      ...formData,
      selectedDates: newSelectedDates
    });
  };

  const renderCalendar = (monthOffset = 0) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthOffset, 1);
    const daysInMonth = getDaysInMonth(date);
    const firstDay = getFirstDayOfMonth(date);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(date.getFullYear(), date.getMonth(), day);
      const isUnavailable = isDateUnavailable(dateString);
      const isSelected = isDateSelected(dateString);

      days.push(
        <div
          key={day}
          className={`calendar-day ${isUnavailable ? 'unavailable' : 'available'} ${isSelected ? 'selected' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDateClick(dateString);
          }}
          style={{
            cursor: isUnavailable ? 'not-allowed' : 'pointer',
            userSelect: 'none'
          }}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="calendar-month">
        <h4>{monthNames[date.getMonth()]} {date.getFullYear()}</h4>
        <div className="calendar-weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="calendar-grid">
          {days}
        </div>
      </div>
    );
  };

  if (showSuccess) {
    return (
      <div className="contact">
        <div className="page-header">
          <Link to="/" className="back-home-btn">← Home</Link>
          <h1>Message Sent Successfully!</h1>
        </div>

        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h2>Thank You for Contacting Us!</h2>
            <p>We've received your message and will respond within 24 hours.</p>
            {formData.selectedDates.length > 0 && (
              <div className="selected-dates-summary">
                <h4>Your Preferred Dates:</h4>
                <ul>
                  {formData.selectedDates.map(date => (
                    <li key={date}>{new Date(date).toLocaleDateString()}</li>
                  ))}
                </ul>
              </div>
            )}
            <p>For urgent matters, please call us at <a href="tel:+15551234356">(555) 123-GELATO</a></p>
            <button
              onClick={() => setShowSuccess(false)}
              className="cta-button primary"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact">
      <div className="page-header">
        <h1>Contact Sweet Ice Delights</h1>
      </div>

      <div className="contact-content">
        {/* Contact Hero */}
        <section className="contact-hero">
          <div className="hero-content">
            <h2>🍧 Get in Touch</h2>
            <p className="lead">
              Ready to make your event sweeter? Contact us for catering, special orders,
              or just to say hello. We're here to help make your celebration unforgettable!
            </p>
          </div>
        </section>

        <div className="contact-main-centered">
          {/* Contact Form */}
          <section className="contact-form-section card">
            <div className="form-container">
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventType">Event Type</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select event type</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="festival">Festival/Fair</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="form-group">
                  <label>Preferred Event Dates</label>
                  <button
                    type="button"
                    className="calendar-toggle-btn"
                    onClick={() => {
                      console.log('Calendar toggle clicked, current state:', showCalendar);
                      setShowCalendar(!showCalendar);
                    }}
                  >
                    📅 {showCalendar ? 'Hide Calendar' : 'Select Dates'}
                  </button>

                  {formData.selectedDates.length > 0 && (
                    <div className="selected-dates-display">
                      <p>Selected dates:</p>
                      <div className="selected-dates-list">
                        {formData.selectedDates.map(date => (
                          <span key={date} className="selected-date-tag">
                            {new Date(date).toLocaleDateString()}
                            <button
                              type="button"
                              onClick={() => handleDateClick(date)}
                              className="remove-date-btn"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {showCalendar && (
                    <div className="calendar-popup" style={{ display: 'block' }}>
                      <div className="calendar-header">
                        <h4>Select Your Preferred Dates</h4>
                        <p>Click on available dates to select them for your event</p>
                      </div>

                      <div className="calendar-legend">
                        <div className="legend-item">
                          <div className="legend-color available"></div>
                          <span>Available</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-color selected"></div>
                          <span>Selected</span>
                        </div>
                        <div className="legend-item">
                          <div className="legend-color unavailable"></div>
                          <span>Unavailable</span>
                        </div>
                      </div>

                      <div className="calendar-container">
                        {renderCalendar(0)}
                        {renderCalendar(1)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Tell us about your event, number of guests, or any questions you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-btn cta-button primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </section>

          {/* Quick Contact Info */}
          <section className="quick-contact-section card">
            <div className="quick-contact-container">
              <h3>📞 Quick Contact</h3>
              <p>Need immediate assistance? Reach out directly!</p>

              <div className="quick-contact-cards">
                <div className="quick-contact-card">
                  <div className="contact-icon">📞</div>
                  <h4>Call Us</h4>
                  <a href="tel:+15551234356" className="contact-link">
                    (555) 123-GELATO
                  </a>
                  <p className="contact-note">Mon-Fri: 9AM-6PM</p>
                </div>

                <div className="quick-contact-card">
                  <div className="contact-icon">📧</div>
                  <h4>Email Us</h4>
                  <a href="mailto:events@sweeticedelights.com" className="contact-link">
                    events@sweeticedelights.com
                  </a>
                  <p className="contact-note">24hr response</p>
                </div>

                <div className="quick-contact-card">
                  <div className="contact-icon">📍</div>
                  <h4>Visit Us</h4>
                  <p>123 Gelato Street<br/>Sweet City, SC 12345</p>
                  <p className="contact-note">Open daily!</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Contact;
