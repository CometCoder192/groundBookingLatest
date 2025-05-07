import { Link } from 'react-router-dom';

const Home = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Book Your Ground Slot</h1>
          <p className="hero-subtitle">
            Easily manage and book ground slots for your sports activities.
            Find available timings and make reservations in just a few clicks.
          </p>
          <Link to="/booking" className="hero-cta">Book Now</Link>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Quick Booking</h3>
              <p className="feature-description">
                Book your ground slot in seconds with our simple and intuitive interface.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">Flexible Timings</h3>
              <p className="feature-description">
                Choose from a wide range of available timings that suit your schedule.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure Payments</h3>
              <p className="feature-description">
                Safe and secure payment processing for all your bookings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Book Your Slot?</h2>
          <p className="cta-description">
            {isAuthenticated 
              ? "Browse available slots and make your booking now!"
              : "Join thousands of users who have already booked their ground slots with us."}
          </p>
          {isAuthenticated ? (
            <Link to="/booking" className="btn btn-primary">Book a Slot</Link>
          ) : (
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;