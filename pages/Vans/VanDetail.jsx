import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getVans } from "../../api";

/**
 * VanDetail component to display details of a specific van.
 *
 * @component
 * @example
 * return (
 *   <VanDetail />
 * )
 */
export default function VanDetail() {
  // State to store the van details
  const [van, setVan] = React.useState(null);
  // State to manage the loading status
  const [loading, setLoading] = React.useState(false);
  // State to handle any errors during data fetching
  const [error, setError] = React.useState(null);
  // Retrieve the van ID from the URL parameters
  const { id } = useParams();
  // Access the current location object
  const location = useLocation();

  /**
   * Fetches van details based on the van id.
   * This effect runs whenever the `id` changes.
   */
  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        // Fetch the van data from the API
        const data = await getVans(id);
        setVan(data);
      } catch (err) {
        // Set the error state if there is an error
        setError(err);
      } finally {
        // Set loading to false after the data is fetched
        setLoading(false);
      }
    }
    loadVans();
  }, [id]);

  // Display a loading message while the data is being fetched
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Display an error message if there was an error fetching the data
  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  // Extract search and type state from the location object
  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      {/* Link to go back to the previous page with search parameters */}
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      {/* Display the van details if the van data is available */}
      {van && (
        <div className="van-detail">
          {/* Van image */}
          <img src={van.imageUrl} alt={`${van.name}`} />
          {/* Van type */}
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          {/* Van name */}
          <h2>{van.name}</h2>
          {/* Van price */}
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          {/* Van description */}
          <p>{van.description}</p>
          {/* Button to rent the van */}
          <button className="link-button">Rent this van</button>
        </div>
      )}
    </div>
  );
}
