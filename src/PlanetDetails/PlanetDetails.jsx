import { useParams, useLocation, useNavigate } from "react-router-dom";
import ResidentInfo from "../ResidentInfo/ResidentInfo";
import { planets } from "../data/planets";
import "./details.css";

const PlanetDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { planet: planetName } = useParams();
  const planet =
    location.state?.planet ||
    planets.find(({ name }) => name.toLowerCase() === planetName.toLowerCase());

  if (!planet) {
    return (
      <div className="planetDetails">
        <div
          className="backbtn"
          onClick={() => {
            navigate("/planets");
          }}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </div>
        <div className="noresident">Planet not found.</div>
      </div>
    );
  }

  return (
    <div className="planetDetails">
      <div
        className="backbtn"
        onClick={() => {
          navigate("/planets");
        }}
      >
        <span className="material-symbols-outlined">arrow_back</span>
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
            planet.residents.map((resident, index) => (
              <ResidentInfo key={`${resident.name}-${index}`} resident={resident} />
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
