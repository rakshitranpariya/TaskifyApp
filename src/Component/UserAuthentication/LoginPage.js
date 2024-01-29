import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    // handle compare logic in dynamoDb.
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/userLogin",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      // Assuming the response has a "message" property
      if (response.data && response.data.message === "Login successful") {
        // Redirect to another page upon successful login
        console.log("done");
        navigate("/tasklist");
      } else {
        console.log("avi gayo");
        // Handle other cases, e.g., show an error message
        navigate("/login");
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-4">Taskify</h1>
        </div>

        <div className="col-md-6 ">
          <h2 className="display-6 fw-semibold ">Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                value={email}
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
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
