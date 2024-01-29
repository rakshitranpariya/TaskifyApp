import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    console.log(email, password);
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/userRegistration",
      {
        email,
        password,
      }
    );
    console.log(response);
  };

  const handleGoToLogin = () => {
    navigate("/new-route");
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3">
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-4">Taskify</h1>
        </div>
        <h2 className="display-6 fw-semibold ">Register</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              type="text"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>

          <p className="mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link-primary"
              onClick={handleGoToLogin}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
