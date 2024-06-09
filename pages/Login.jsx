import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

/**
 * Login component to handle user authentication.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * )
 */
export default function Login() {
  // State to manage form data
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });
  // State to manage the form submission status
  const [status, setStatus] = React.useState("idle");
  // State to handle any errors during login
  const [error, setError] = React.useState(null);

  // Retrieve the location object
  const location = useLocation();
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Retrieve the 'from' location from the state or default to '/host'
  const from = location.state?.from || "/host";

  /**
   * Handles form submission.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    loginUser(loginFormData)
      .then((data) => {
        setError(null);
        localStorage.setItem("loggedin", true);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  /**
   * Handles input field changes.
   *
   * @param {React.ChangeEvent} e - The input change event.
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      {/* Display message if redirected to login with a message */}
      {location.state?.message && (
        <h3 className="login-error">{location.state.message}</h3>
      )}
      <h1>Sign in to your account</h1>
      {/* Display error message if login fails */}
      {error?.message && <h3 className="login-error">{error.message}</h3>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
