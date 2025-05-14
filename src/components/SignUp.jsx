import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css"

const SignUp = () => {
 const navigate = useNavigate(); // ✅ get navigation function

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name")
    };

    try {
      const response = await axios.post(
        "https://todosbackend-0gka.onrender.com/api/signup",
        userData ,{withCredentials: true}
       
      );

      console.log("SignUp successful:", response.data);

      // ✅ Redirect to dashboard or homepage
      navigate("/home"); // change this path to whatever route you want
    } catch (error) {
      console.error("SignUp failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
         <label htmlFor="name">Name</label>
        <input type="text" placeholder="Enter Name" name="name" required />
        
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Enter Email" name="email" required />
       

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter Password" name="password" required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp