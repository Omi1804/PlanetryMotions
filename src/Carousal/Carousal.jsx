import React, { useEffect, useRef, useState } from "react";
import Flickity from "flickity";
import { useNavigate } from "react-router-dom";
import "flickity/css/flickity.css"; // Make sure to import Flickity CSS
import "./carousal.css";
import Planet from "../Planet/Planet";

const Carousel = ({ planetDetails }) => {
  const carouselRef = useRef();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const flickityInstance = new Flickity(carouselRef.current, {
      // options
      cellAlign: "left",
      contain: true,
      wrapAround: true,
      pauseAutoPlayOnHover: true,
    });

    return () => flickityInstance.destroy();
  });

  function handleSidebarClick() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const redirectToPlanet = (planet, residents) => {
    navigate(`/${planet.name}`, {
      state: { planet },
    });
  };

  return (
    <>
      <div
        className={`slideMenuIcon ${isSidebarOpen ? "open" : ""}`}
        onClick={handleSidebarClick}
      >
        <span className="material-symbols-outlined">menu</span>
      </div>

      <div className={`sideMenu ${isSidebarOpen ? "open" : ""}`}>
        <div className="header">
          <p>Select The Planet</p>
          <span
            className="material-symbols-outlined"
            onClick={handleSidebarClick}
          >
            close
          </span>
        </div>
        <ul>
          {planetDetails.map((planet, index) => (
            <li
              key={index}
              onClick={() => redirectToPlanet(planet, planet.residents)}
            >
              {planet.name}
            </li>
          ))}
        </ul>
      </div>
      <div ref={carouselRef} className="carousel">
        {planetDetails.map((planet, index) => (
          <div className="carousel-cell" key={index}>
            <div key={index} className="planet-cell">
              <Planet planet={planet} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Carousel;
