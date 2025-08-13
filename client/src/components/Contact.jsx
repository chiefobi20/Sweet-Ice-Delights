import React, { useState } from 'react';
import '../App.css';

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
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock unavailable dates (you can replace with API data)
  const unavailableDates = [
    '2024-12-15', '2024-12-22', '2024-12-25', '2024-12-31',
    '2025-01-01', '2025-01-15', '2025-01-20'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
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
        }),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          message: '',
          selectedDates: []
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  const checkConsecutiveDays = (newSelectedDates) => {
    if (newSelectedDates.length < 5) return false;
    
    const sortedDates = newSelectedDates.sort();
    let consecutiveCount = 1;
    
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i]);
      const previousDate = new Date(sortedDates[i - 1]);
      const dayDifference = (currentDate - previousDate) / (1000 * 60 * 60 * 24);
      
      if (dayDifference === 1) {
        consecutiveCount++;
        if (consecutiveCount >= 5) {
          return true;
        }
      } else {
        consecutiveCount = 1;
      }
    }
    
    return false;
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

    if (checkConsecutiveDays(newSelectedDates)) {
      alert('You cannot select 5 consecutive days. Please choose non-consecutive dates or limit consecutive selections to 4 days maximum.');
      return;
    }

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
      days.push(<div key={`empty-${i}`} style={{ visibility: 'hidden' }}></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(date.getFullYear(), date.getMonth(), day);
      const isUnavailable = isDateUnavailable(dateString);
      const isSelected = isDateSelected(dateString);

      let dayStyle = {
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        fontWeight: '500',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease',
        border: '1px solid transparent',
        minHeight: '35px',
        cursor: isUnavailable ? 'not-allowed' : 'pointer',
        userSelect: 'none'
      };

      if (isUnavailable) {
        dayStyle = {
          ...dayStyle,
          background: '#6c757d',
          color: 'white',
          opacity: '0.7'
        };
      } else if (isSelected) {
        dayStyle = {
          ...dayStyle,
          background: '#28a745',
          color: 'white',
          border: '1px solid #1e7e34',
          fontWeight: '600'
        };
      } else {
        dayStyle = {
          ...dayStyle,
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          color: '#495057'
        };
      }

      days.push(
        <div
          key={day}
          style={dayStyle}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDateClick(dateString);
          }}
          onMouseEnter={(e) => {
            if (!isUnavailable && !isSelected) {
              e.target.style.background = '#e9ecef';
              e.target.style.borderColor = '#adb5bd';
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isUnavailable && !isSelected) {
              e.target.style.background = '#f8f9fa';
              e.target.style.borderColor = '#dee2e6';
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          {day}
        </div>
      );
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>
          {monthNames[date.getMonth()]} {date.getFullYear()}
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
          marginBottom: '0.5rem'
        }}>
          <div style={{ padding: '0.5rem', fontWeight: '600', color: '#6c757d', fontSize: '0.8rem' }}>Sun</div>
          <div style={{ padding: '0.5rem', fontWeight: '600', color: '#6c757d', fontSize: '0.8rem' }}>Mon</div>
          <div style={{ padding: '0.5rem', fontWeight: '600', color: '#6c757d', fontSize: '0.8rem' }}>Tue</div>
          <div style={{ padding: '0.5rem', fontWeight: '600', color: '#6c757d', fontSize: '0.8rem' }}>Wed</div>
          <div style={{ padding: '0.5rem', fontWeight: '600', color: '#6c757d', fontSize: '0.8rem' }}>Thu</div>
          <div style={{ padding: '0.5rem', fontWeight: '600', color: '#6c757d', fontSize: '0.8rem' }}>Fri</div>
          <div style={{ padding: '0.5rem', fontWeight: '600', color: '#6c757d', fontSize: '0.8rem' }}>Sat</div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px'
        }}>
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="contact min-h-screen flex items-center justify-center py-16">
      <div className="container max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <img 
            src="/src/assets/high cam asorted flavors.JPG" 
            alt="Assorted Flavors" 
            className="contact-image mx-auto mb-6"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}
          />
          <p className="text-xl text-gray-700">
            Ready to make your event sweeter? Contact us for catering, special orders, or just to say hello.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-pink-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="text-pink-500 mr-3">📧</span>
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Event Type</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select event type</option>
                  <option value="birthday">Birthday Party</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="festival">Festival/Fair</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Date Selection */}
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">Preferred Event Dates</label>
                <button
                  type="button"
                  style={{
                    background: 'linear-gradient(135deg, #007bff, #0056b3)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginBottom: '1rem',
                    width: '100%'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCalendar(!showCalendar);
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 5px 15px rgba(0, 123, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
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
                  <div style={{
                    background: 'white',
                    border: '2px solid #e0e0e0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginTop: '1rem',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    position: 'relative',
                    zIndex: 1000
                  }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <h4 style={{ color: '#2c3e50', marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: '600' }}>
                        Select Your Preferred Dates
                      </h4>
                      <p style={{ color: '#6c757d', fontSize: '0.9rem', margin: 0 }}>
                        Click on available dates to select them for your event
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '2rem',
                      marginBottom: '1.5rem',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          background: '#f8f9fa',
                          border: '1px solid #dee2e6'
                        }}></div>
                        <span>Available</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          background: '#28a745',
                          border: '1px solid #1e7e34'
                        }}></div>
                        <span>Selected</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          background: '#6c757d',
                          border: '1px solid #495057'
                        }}></div>
                        <span>Unavailable</span>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
                      gap: '2rem'
                    }}>
                      {renderCalendar(0)}
                      {renderCalendar(1)}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                  placeholder="Tell us about your event, number of guests, or any questions you have..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition duration-300 transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-pink-200">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="text-pink-500 mr-3">📞</span>
                Quick Contact
              </h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Call Us:</strong> (555) 123-GELATO</p>
                <p><strong>Hours:</strong> Mon-Fri: 9AM-5PM</p>
                <p><strong>Email:</strong> events@sweeticedelights.com</p>
                <p><strong>Response:</strong> 24hr response</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-pink-200">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="text-pink-500 mr-3">📍</span>
                Visit Us
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>123 Gelato Street</p>
                <p>Sweet City, SC 12345</p>
                <p>Open daily</p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-pink-200">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="text-pink-500 mr-3">📱</span>
                Follow Us
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">@sweeticedelights</p>
                <p className="text-gray-700">Daily updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
