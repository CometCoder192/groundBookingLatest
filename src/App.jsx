import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Nav from './components/nav';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import BookingForm from './components/BookingForm';
import Timings from './components/timings';
import GroundSelection from './components/GroundSelection';
import TimingSelection from './components/TimingSelection';
import Approvals from './components/Approvals';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';

// Import CSS files
import './styles/global.css';
import './styles/nav.css';
import './styles/form.css';
import './styles/home.css';
import './styles/groundSelection.css';
import './styles/approvals.css';

function App() {
  // State to manage user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/booking" element={
              <ProtectedRoute>
                <GroundSelection />
              </ProtectedRoute>
            } />
            <Route path="/booking/:groundType" element={
              <ProtectedRoute>
                <BookingForm />
              </ProtectedRoute>
            } />
            <Route path="/timings" element={<TimingSelection />} />
            <Route path="/timings/:groundType" element={<Timings />} />
            <Route path="/approvals" element={
              <ProtectedRoute>
                <Approvals />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
