import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const [login, setLogin] = useState({
    email: location.state?.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        login
      );

      toast.success(response.data.message);

      // Save logged-in user
      const user = {
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      };

      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      if (response.data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {

      console.error(error);

      if (error.response) {
        toast.error(
          error.response.data.message || "Invalid email or password"
        );
      } else {
        toast.error("Server not running or cannot connect");
      }

    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={login.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;