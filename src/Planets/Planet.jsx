import React from "react";
import "./planet.css";

const generatePlanetStyle = (planet) => {
  // Use properties of the planet to influence the randomness
  const seed = (planet.diameter / 100) % 100; // Example seed, use more properties for variation

  // Generate some random values based on the seed
  const size = Math.floor(seed / 5 + 20); // Adjust size slightly based on the seed
  const color1 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const color2 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const color3 = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const shadowColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const boxShadow = `0 0 ${10 + Math.random() * 10}px ${shadowColor}, 
                     inset 0 0 ${20 + Math.random() * 20}px ${shadowColor}, 
                     0 0 ${50 + Math.random() * 30}px ${shadowColor}, 
                     inset 0 0 ${60 + Math.random() * 40}px ${shadowColor}`;
  console.log(seed, size);

  return {
    width: `${size}rem`,
    height: `${size}rem`,
    background: `radial-gradient(circle at 20% 20%, ${color1}, transparent 80%), 
                 radial-gradient(circle at 55% 45%, ${color2}, transparent 40%), 
                 radial-gradient(circle at 75% 10%, ${color3}, transparent 50%)`,
    boxShadow,
  };
};

const Planet = ({ planet }) => {
  const planetStyle = generatePlanetStyle(planet);

  return <div className="planet" style={planetStyle}></div>;
};

export default Planet;
