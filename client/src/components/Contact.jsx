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
    console.log('Date clicked:', dateString);
    if (isDateUnavailable(dateString)) {
      console.log('Date unavailable, ignoring click');
      return;
    }

    const newSelectedDates = isDateSelected(dateString)
      ? formData.selectedDates.filter(date => date !== dateString)
      : [...formData.selectedDates, dateString];

    console.log('New selected dates:', newSelectedDates);
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
                    <li key={date}>
                      {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </li>
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
        <h1>Contact Us</h1>
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
                    <label htmlFor="name">Name *</label>
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
                            {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
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

                <div className="quick-contact-card">
                  <div className="contact-icon">📱</div>
                  <h4>Follow Us On Instagram</h4>
                  <a href="https://instagram.com/sweeticedelights" className="contact-link" target="_blank" rel="noopener noreferrer">
                    @sweeticedelights
                  </a>
                  <p className="contact-note">Daily updates</p>
                </div>

                <div className="quick-contact-card">
                  <div className="contact-icon">👍</div>
                  <h4>Like Us On Facebook</h4>
                  <a href="https://facebook.com/sweeticedelights" className="contact-link" target="_blank" rel="noopener noreferrer">
                    Sweet Ice Delights
                  </a>
                  <p className="contact-note">Events & specials</p>
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

// Add these styles to the existing CSS or create a separate CSS file
const calendarStyles = `
.calendar-popup {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.calendar-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.calendar-header h4 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.calendar-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.legend-color.available {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
}

.legend-color.selected {
  background: #28a745;
  border: 1px solid #1e7e34;
}

.legend-color.unavailable {
  background: #6c757d;
  border: 1px solid #495057;
}

.calendar-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.calendar-month {
  text-align: center;
}

.calendar-month h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: 0.5rem;
}

.calendar-weekdays div {
  padding: 0.5rem;
  font-weight: 600;
  color: #6c757d;
  font-size: 0.8rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.calendar-day.empty {
  visibility: hidden;
}

.calendar-day.available {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #495057;
}

.calendar-day.available:hover {
  background: #e9ecef;
  border-color: #adb5bd;
  transform: scale(1.05);
}

.calendar-day.selected {
  background: #28a745;
  color: white;
  border: 1px solid #1e7e34;
  font-weight: 600;
}

.calendar-day.selected:hover {
  background: #218838;
}

.calendar-day.unavailable {
  background: #6c757d;
  color: white;
  cursor: not-allowed;
  opacity: 0.7;
}

.calendar-toggle-btn {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.calendar-toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.selected-dates-display {
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.selected-dates-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.selected-date-tag {
  background: #28a745;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remove-date-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-date-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .calendar-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .calendar-legend {
    gap: 1rem;
  }

  .legend-item {
    font-size: 0.8rem;
  }

  .calendar-day {
    font-size: 0.8rem;
  }
}
`;

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = calendarStyles;
  document.head.appendChild(styleSheet);
}
