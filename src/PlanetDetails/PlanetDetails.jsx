import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ResidentInfo from "../ResidentInfo/ResidentInfo";
import "./details.css";
// import ResidentInfo from "../ResidentInfo/ResidentInfo";

const PlanetDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [planet, setPlanet] = useState(location.state.planet);

  useEffect(() => {});

  return (
    <div className="planetDetails">
      <div
        className="backbtn"
        onClick={() => {
          navigate("/planets");
        }}
      >
        <span class="material-symbols-outlined">arrow_back</span>
      </div>
      <div className="personalDetails">
        <div className="heading">Planet Details</div>
        <div className="details">
          <div>
            Name: <span>{planet.name}</span>
          </div>
          <div>
            Climate: <span>{planet.climate}</span>
          </div>
          <div>
            Population: <span>{planet.population}</span>
          </div>
          <div>
            Terrain: <span>{planet.terrain}</span>
          </div>
        </div>
      </div>
      <div className="residents">
        <div className="heading">Residents Information</div>
        <div className="residentContainer">
          {planet.residents.length > 0 ? (
            planet.residents.map((residentUrl, index) => (
              <ResidentInfo key={index} url={residentUrl} />
            ))
          ) : (
            <div className="noresident">No known residents.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetDetails;
