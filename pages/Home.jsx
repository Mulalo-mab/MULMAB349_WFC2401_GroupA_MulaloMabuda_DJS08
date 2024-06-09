import React from "react";
import { Link } from "react-router-dom";

/**
 * Home component to display the homepage content.
 *
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
export default function Home() {
  return (
    <div className="home-container">
      {/* Main headline */}
      <h1>You got the travel plans, we got the travel vans.</h1>
      {/* Description paragraph */}
      <p>
        Add adventure to your life by joining the #vanlife movement. Rent the
        perfect van to make your perfect road trip.
      </p>
      {/* Link to the vans page */}
      <Link to="vans">Find your van</Link>
    </div>
  );
}
