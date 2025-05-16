import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/home.css';

import ShowList from './ShowList';

const Home = () => {
  const navigate = useNavigate();

  // 👇 Add this useEffect to verify token on page mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          'https://todosbackend-0gka.onrender.com/api/verify',
          { withCredentials: true }
        );
        // ✅ Token is valid, do nothing
      } catch (err) {
        console.warn('Not authenticated:', err.response?.data || err.message);
        navigate('/'); // 👈 redirect to login if not authenticated
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://todosbackend-0gka.onrender.com/api/logout',
        {},
        { withCredentials: true }
      );
      navigate('/'); // 👈 redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    }
  };

 return (
  <div className='home'>
    <div className="home-header">
      <h1>Welcome to Your Dashboard</h1>
      <button className='logout-button' onClick={handleLogout}>
        Logout
      </button>
    </div>
    <ShowList />
  </div>
);
};

export default Home;
