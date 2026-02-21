import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      alert("Login Success ✅");
      navigate("/admin");
    } catch {
      alert("Invalid Login");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;