import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav>
      <h1>Trello Clone</h1>
      <div className="links">
        <Link to={"/"}>Login</Link>
        <Link to={"/signUp"}>Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
