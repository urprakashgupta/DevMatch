import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";
import Body from "./Body";

function App() {
  return (
    <>
      <Body />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}

export default App;
