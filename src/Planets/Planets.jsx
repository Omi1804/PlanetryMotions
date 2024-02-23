import "./planets.css";
import { useState, useEffect } from "react";
import Carousel from "../Carousal/Carousal";

const Planets = () => {
  const [planetDetails, setPlanetDetails] = useState([]);

  useEffect(() => {
    const fetchPlanetaryDetails = async () => {
      try {
        const response = await fetch(
          "https://swapi.dev/api/planets/?format=json"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setPlanetDetails(data.results);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPlanetaryDetails();
  }, []);

  console.log(planetDetails);
  return (
    <div className="planets">
      <Carousel planetDetails={planetDetails} />
    </div>
  );
};

export default Planets;
