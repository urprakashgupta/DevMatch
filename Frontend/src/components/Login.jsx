import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("prakash@gmail.com");
  const [password, setPassword] = useState("Prakash@2004");

  const handleLogin = async () => {
    console.log("Clicked ✅");
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email </label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
