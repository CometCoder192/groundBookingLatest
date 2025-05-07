import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Nav = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          GroundSlot
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/booking" className="nav-link">Book Slot</Link>
          <Link to="/timings" className="nav-link">Timings</Link>
          <Link to="/approvals" className="nav-link">Authority Approvals</Link>
        </div>
        <div className="nav-actions">
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-btn nav-btn-outline">Logout</button>
          ) : (
            <>
              <Link to="/login" className="nav-btn nav-btn-outline">Login</Link>
              <Link to="/signup" className="nav-btn nav-btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;