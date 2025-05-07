import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formData.password !== formData.confirmPassword) {
  //     setError('Passwords do not match');
  //     return;
  //   }
  //   // console.log('Signup data:', formData); // Replace with API call
  //   // navigate('/login');
  //   try {
  //     const response = await fetch('http://localhost:5000/api/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: formData.name,
  //         email: formData.email,
  //         password: formData.password,
  //         role: formData.role
  //       }),
  //     });
    
  //     const data = await response.json();
    
  //     if (response.ok) {
  //       localStorage.setItem('token', data.token);
  //       localStorage.setItem('role', data.role);
  //       localStorage.setItem('name', data.name);
  //       navigate('/home'); // or wherever you want after signup
  //     } else {
  //       setError(data.message || 'Signup failed');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setError('An error occurred during signup');
  //   }
    


  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.message || 'Signup failed');
        return;
      }
  
      // Save token & role to localStorage (or Context in future)
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
  
      navigate('/'); // redirect to homepage after successful signup
    } catch (err) {
      console.error(err);
      setError('An error occurred during signup');
    }
  };
  

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Create Account</h2>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <div className="form-group form-radio-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={formData.role === 'student'}
                  onChange={handleChange}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === 'admin'}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="form-submit">Sign Up</button>
        </form>
        <div className="form-footer">
          Already have an account? <Link to="/login" className="form-link">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;