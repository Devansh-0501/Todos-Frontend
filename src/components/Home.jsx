import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/home.css'

import ShowList from './ShowList'

const Home = () => {
  const navigate=useNavigate();
   const handleLogout = async () => {
    try {
      await axios.post(
        "https://todosbackend-0gka.onrender.com/api/logout",
        {},
        
      );
      navigate("/"); // 👈 redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

 

  return (
    <div className='home'>
       
        
        <ShowList /> 
        <button className='logout-button' onClick={handleLogout}>logout</button>
       
       
    </div>
  )
}

export default Home