import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Timings() {
  const { groundType } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookings, setBookings] = useState({
    approved: [],
    pending: []
  });
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8); // 8 to 18

  useEffect(() => {
    // Load bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const relevantBookings = allBookings.filter(
      booking => booking.date === selectedDate && booking.groundType === groundType
    );

    // Separate bookings by status
    const approved = relevantBookings
      .filter(booking => booking.status === 'Approved')
      .map(booking => parseInt(booking.timeSlot));

    const pending = relevantBookings
      .filter(booking => booking.status === 'Pending')
      .map(booking => parseInt(booking.timeSlot));

    setBookings({ approved, pending });
  }, [selectedDate, groundType]);

  const getGroundTitle = () => {
    switch(groundType) {
      case 'football':
        return 'Football Ground';
      case 'volleyball':
        return 'Volleyball Court';
      case 'lawn':
        return 'Lawn Ground';
      default:
        return 'Ground';
    }
  };

  const getSlotStyle = (hour) => {
    if (bookings.approved.includes(hour)) {
      return {
        backgroundColor: '#f87171', // Red for booked (approved)
        color: 'white'
      };
    }
    if (bookings.pending.includes(hour)) {
      return {
        backgroundColor: '#fbbf24', // Yellow for pending
        color: 'black'
      };
    }
    return {
      backgroundColor: '#86efac', // Green for available
      color: 'black'
    };
  };

  const getSlotStatus = (hour) => {
    if (bookings.approved.includes(hour)) return 'Booked';
    if (bookings.pending.includes(hour)) return 'Pending Approval';
    return 'Available';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{getGroundTitle()} - Available Time Slots</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="legend" style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#86efac', borderRadius: '4px' }}></div>
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#f87171', borderRadius: '4px' }}></div>
          <span>Booked</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#fbbf24', borderRadius: '4px' }}></div>
          <span>Pending Approval</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {timeSlots.map((hour) => (
          <div
            key={hour}
            style={{
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: 'bold',
              ...getSlotStyle(hour)
            }}
          >
            {hour}:00 - {hour + 1}:00 <br />
            {getSlotStatus(hour)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timings;
