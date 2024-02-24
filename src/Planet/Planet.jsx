import React from "react";
import { useNavigate } from "react-router-dom";
import "./planet.css";

const generatePlanetStyle = (planet) => {
  const seed = (planet.diameter / 100) % 100;
  const hasRings = Math.random() < 0.4; // 40% chance of having rings

  const size = Math.floor(seed / 5 + 20);
  const colors = [
    `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  ];
  const shadowColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const background = `radial-gradient(circle at 20% 20%, ${colors[0]}, transparent 100%), 
                      radial-gradient(circle at 55% 45%, ${colors[1]}, transparent 60%), 
                      radial-gradient(circle at 75% 10%, ${colors[2]}, transparent 50%)`;

  const boxShadow = `0 0 ${10 + Math.random() * 10}px ${shadowColor},
                     inset 0 0 ${20 + Math.random() * 20}px ${shadowColor},
                     0 0 ${50 + Math.random() * 30}px ${shadowColor},
                     inset 0 0 ${60 + Math.random() * 40}px ${shadowColor}`;

  // Ring styles if the planet has rings
  const ringSize = size * 1.5;
  const ringColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const ringShadow = `0 0 ${15 + Math.random() * 15}px ${ringColor}, 
                      inset 0 0 ${25 + Math.random() * 25}px ${ringColor}`;

  return {
    width: `${size}svw`,
    height: `${size}svw`,
    background,
    boxShadow,
    position: "relative",
    borderRadius: "50%",
    // Ring styles applied conditionally
    ":before": hasRings
      ? {
          content: '""',
          display: "block",
          position: "absolute",
          width: `${ringSize}svw`,
          height: `${ringSize / 10}svw`,
          borderRadius: "50%",
          background: ringColor,
          boxShadow: ringShadow,
          top: `calc(50% - ${ringSize / 20}svw)`,
          left: `calc(50% - ${ringSize / 2}svw)`,
          zIndex: "-1",
        }
      : {},
  };
};

const Planet = ({ planet }) => {
  const navigate = useNavigate();
  const planetStyle = generatePlanetStyle(planet);
  const hasRings = Math.random() < 0.4;

  const ringThickness = ".1rem";

  // Generate a unique className for potentially adding rings
  const planetClassName = `planet-${planet.name
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  // Dynamic style for rings using a style tag
  const ringStyle = hasRings
    ? `
    .${planetClassName}::before {
      content: "";
      display: block;
      position: relative;
      width: ${planetStyle[":before"]?.width};
      height: ${planetStyle[":before"]?.height};
      border: ${ringThickness} solid ${planetStyle[":before"]?.background};
      box-shadow: ${planetStyle[":before"]?.boxShadow};
      border-radius: 50%;
      top: ${planetStyle[":before"]?.top};
      left: ${planetStyle[":before"]?.left};
      z-index: -1;
    }
  `
    : "";

  return (
    <div className="planetSec">
      {hasRings && <style>{ringStyle}</style>}

      <div className="planetDetailsSec">
        <div className="climate">
          Climate - <span>{planet.climate.split(",")[0]}</span>
        </div>
        <div className="population">
          Population - <span>{planet.population}</span>
        </div>
        <div className="terrain">
          Terrain - <span>{planet.terrain.split(",")[0]}</span>
        </div>
      </div>
      <div className={`planet ${planetClassName}`} style={planetStyle}></div>
      <div
        className="planetName"
        onClick={() => {
          navigate(`/${planet.name}`, {
            state: { planet },
          });
        }}
      >
        {planet.name}
      </div>
      <div
        className="noteSec"
        onClick={() => {
          navigate(`/${planet.name}`, {
            state: { planet },
          });
        }}
      >
        More Details
        <span className="material-symbols-outlined">arrow_right_alt</span>
      </div>
    </div>
  );
};

export default Planet;
