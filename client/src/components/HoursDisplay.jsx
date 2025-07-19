function HoursDisplay({ compact = false }) {
  const getCurrentStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;

    // Define hours in minutes from midnight
    const hours = {
      monday: { open: 11 * 60, close: 21 * 60 }, // 11 AM - 9 PM
      tuesday: { open: 11 * 60, close: 21 * 60 },
      wednesday: { open: 11 * 60, close: 21 * 60 },
      thursday: { open: 11 * 60, close: 21 * 60 },
      friday: { open: 11 * 60, close: 22 * 60 }, // 11 AM - 10 PM
      saturday: { open: 11 * 60, close: 22 * 60 },
      sunday: { open: 12 * 60, close: 20 * 60 } // 12 PM - 8 PM
    };

    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayHours = hours[dayNames[day]];

    const isOpen = currentTime >= todayHours.open && currentTime < todayHours.close;

    // Helper function to format time in 12-hour format
    const formatTime = (minutes) => {
      const totalHours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const hour12 = totalHours === 0 ? 12 : totalHours > 12 ? totalHours - 12 : totalHours;
      const ampm = totalHours >= 12 ? 'PM' : 'AM';
      return `${hour12}:${mins.toString().padStart(2, '0')} ${ampm}`;
    };

    return {
      isOpen,
      todayHours: `${formatTime(todayHours.open)} - ${formatTime(todayHours.close)}`
    };
  };

  const status = getCurrentStatus();

  if (compact) {
    return (
      <div className="hours-compact">
        <span className={`status-indicator ${status.isOpen ? 'open' : 'closed'}`}>
          {status.isOpen ? '🟢 Open' : '🔴 Closed'}
        </span>
        <span className="today-hours">{status.todayHours}</span>
      </div>
    );
  }

  return (
    <div className="hours-widget">
      <h4>Store Hours</h4>
      <div className={`current-status ${status.isOpen ? 'open' : 'closed'}`}>
        {status.isOpen ? '🟢 Currently Open' : '🔴 Currently Closed'}
      </div>
      <div className="today-hours">Today: {status.todayHours}</div>
    </div>
  );
}

export default HoursDisplay;
