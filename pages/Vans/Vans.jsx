import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";

/**
 * Vans component to display a list of vans with filter options.
 *
 * @component
 * @example
 * return (
 *   <Vans />
 * )
 */
export default function Vans() {
  // State to manage search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  // State to store the list of vans
  const [vans, setVans] = React.useState([]);
  // State to manage the loading status
  const [loading, setLoading] = React.useState(false);
  // State to handle any errors during data fetching
  const [error, setError] = React.useState(null);

  // Extract the type filter from the search parameters
  const typeFilter = searchParams.get("type");

  /**
   * Fetches the list of vans from the API.
   * This effect runs once when the component mounts.
   */
  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        // Fetch the van data from the API
        const data = await getVans();
        setVans(data);
      } catch (err) {
        // Set the error state if there is an error
        setError(err);
      } finally {
        // Set loading to false after the data is fetched
        setLoading(false);
      }
    }

    loadVans();
  }, []);

  // Filter the vans based on the type filter
  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  // Map over the filtered vans to create van elements
  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{
          search: `?${searchParams.toString()}`,
          type: typeFilter,
        }}
      >
        <img src={van.imageUrl} alt={`${van.name}`} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  /**
   * Handles the change in filter by updating the search parameters.
   *
   * @param {string} key - The key of the filter parameter.
   * @param {string|null} value - The value of the filter parameter.
   */
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  // Display a loading message while the data is being fetched
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Display an error message if there was an error fetching the data
  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        {/* Filter buttons */}
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
        >
          Rugged
        </button>

        {/* Clear filter button */}
        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
      </div>
      {/* List of van elements */}
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
