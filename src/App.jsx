import { useEffect, useState } from "react";
import "./App.css";
import Background from "./Background/Background";
import Carousel from "./Carousal/Carousal";

import Planet from "./Planets/Planet";

const App = () => {
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
    <div>
      <Background />
      <div className="planets">
        <Carousel planetDetails={planetDetails} />
      </div>
    </div>
  );
};
export default App;
