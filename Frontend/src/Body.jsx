import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Body() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
