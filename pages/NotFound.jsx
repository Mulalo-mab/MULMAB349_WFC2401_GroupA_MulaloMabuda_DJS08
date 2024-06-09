import React from "react";
import { Link } from "react-router-dom";

/**
 * NotFound component to display a 404 error page.
 *
 * @component
 * @example
 * return (
 *   <NotFound />
 * )
 */
export default function NotFound() {
  return (
    <div className="not-found-container">
      {/* Display a message indicating the page was not found */}
      <h1>Sorry, the page you were looking for was not found.</h1>
      {/* Link to return to the home page */}
      <Link to="/" className="link-button">
        Return to Home
      </Link>
    </div>
  );
}
