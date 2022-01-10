//styles
import "./login.css";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

import { useAuthContext } from "../hooks/useAuthContext";

export default function Login() {
  const { user } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useSignup hook
  const { login, isPending, error } = useLogin();

  const handleSub = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className="loginContainer">
      {user && <Navigate replace to="/"></Navigate>}
      <div className="">
        <h2>Login</h2>
        <form onSubmit={handleSub}>
          <label>
            <span>email:</span>
            <input
              required
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>

          <label>
            <span>password:</span>
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <button>Login</button>
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </form>
        <NavLink to="/signup">New here? register now</NavLink>
      </div>
    </div>
  );
}
