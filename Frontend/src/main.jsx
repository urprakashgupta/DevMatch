import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";
import Profile from "./Profile.jsx";
import Body from "./Body.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
