import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar.jsx";

export default function Body() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
