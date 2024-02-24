import "./planets.css";
import { useState, useEffect } from "react";
import Carousel from "../Carousal/Carousal";
import { RingLoader } from "react-spinners";

const Planets = () => {
  const [planetDetails, setPlanetDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define color and cssOverride for RingLoader
  const color = "white"; // Example: white color for the loader
  const cssOverride = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    const fetchPlanetaryDetails = async () => {
      try {
        const response = await fetch(
          "https://swapi.dev/api/planets/?format=json"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setPlanetDetails(data.results);
        setIsLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error("Fetch error:", error);
        setIsLoading(false); // Data fetched, stop loading
      }
    };

    fetchPlanetaryDetails();
  }, []);

  console.log(planetDetails);
  return (
    <div className="planets">
      {isLoading ? (
        <RingLoader
          color={color}
          loading={isLoading}
          cssOverride={cssOverride}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Carousel planetDetails={planetDetails} />
      )}
    </div>
  );
};

export default Planets;
