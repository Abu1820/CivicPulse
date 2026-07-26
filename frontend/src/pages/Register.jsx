import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        register
      );

      toast.success(response.data.message);

      setTimeout(() => {

        navigate("/login", {
          state: {
            email: register.email
          }
        });

      }, 1200);

    } catch (error) {

      console.error(error);

      if (error.response) {
        toast.error(
          error.response.data.message || "Registration failed"
        );
      } else {
        toast.error("Server not running or cannot connect");
      }

    }
  };

  return (

    <div className="register-container">

      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={register.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={register.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={register.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

      </div>

    </div>

  );

}

export default Register;