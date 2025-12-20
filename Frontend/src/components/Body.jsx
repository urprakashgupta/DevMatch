import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Login from "./Login";
import Navbar from "./Navbar";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Login />
      <Footer />
    </div>
  );
};

export default Body;
