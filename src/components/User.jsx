import "../styles/user.css"
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ import this

const User = () => {
 useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          'https://todosbackend-0gka.onrender.com/api/verify',
          { withCredentials: true }
        );
        // ✅ If authenticated, redirect to Home
        navigate('/home');
      } catch (err) {
        // ❌ Not authenticated, stay on login page
      }
    };

    checkAuth();
  }, []);

  
  const navigate = useNavigate(); // ✅ get navigation function

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const response = await axios.post(
        "https://todosbackend-0gka.onrender.com/api/login",
        userData
         ,{withCredentials: true}
       
      );

      console.log("Login successful:", response.data);

      // ✅ Redirect to dashboard or homepage
      navigate("/home"); // change this path to whatever route you want
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      navigate("/signUp")
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Enter Email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter Password" name="password" required />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default User;
