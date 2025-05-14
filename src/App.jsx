import Home from "./components/Home";
import Navbar from "./components/Navbar";
import axios from "axios";
import User from "./components/User";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
