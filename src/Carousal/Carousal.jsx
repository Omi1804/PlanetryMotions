import React, { useEffect, useRef } from "react";
import Flickity from "flickity";
import "flickity/css/flickity.css"; // Make sure to import Flickity CSS
import "./carousal.css";
import Planet from "../Planets/Planet";

const Carousel = ({ planetDetails }) => {
  const carouselRef = useRef();

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

  return (
    <div ref={carouselRef} className="carousel">
      {planetDetails.map((planet, index) => (
        <div className="carousel-cell">
          <div key={index} className="planet-cell">
            <Planet planet={planet} />
          </div>
        </div>
      ))}
      {/* <div className="carousel-cell">Item 1</div>
      <div className="carousel-cell">Item 2</div>
      <div className="carousel-cell">Item 3</div>
      <div className="carousel-cell">Item 4</div>
      <div className="carousel-cell">Item 5</div> */}
    </div>
  );
};

export default Carousel;
