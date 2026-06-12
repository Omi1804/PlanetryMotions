import "./planets.css";
import Carousel from "../Carousal/Carousal";
import { planets } from "../data/planets";

const Planets = () => {
  return (
    <div className="planets">
      <Carousel planetDetails={planets} />
    </div>
  );
};

export default Planets;
