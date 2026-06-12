import { useNavigate } from "react-router-dom";
import "./planet.css";

const palettes = {
  frozen: ["#d9fbff", "#73b6d8", "#24506f", "#f8ffff", "#a7f1ff"],
  volcanic: ["#ffd166", "#e85d04", "#4a1307", "#fff3b0", "#ff9f1c"],
  oceanic: ["#9bf6ff", "#2786a3", "#0b2848", "#e2fffb", "#4cc9f0"],
  lush: ["#b7ef6e", "#2a9d5b", "#16351f", "#f7ffd6", "#71f79f"],
  desert: ["#f6d186", "#c7782f", "#522c17", "#fff2c2", "#f4a261"],
  storm: ["#c8d6e5", "#546a90", "#1b243b", "#f7fbff", "#b8c0ff"],
  twilight: ["#d7b8ff", "#7158b5", "#180d31", "#fff0ff", "#c77dff"],
  default: ["#d4f1f9", "#4b9aaa", "#152d46", "#ffffff", "#80ffdb"],
};

const hashString = (value) =>
  value.split("").reduce((hash, char) => {
    const nextHash = (hash << 5) - hash + char.charCodeAt(0);
    return nextHash & nextHash;
  }, 0);

const seededRandom = (seed) => {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
};

const getPalette = (planet) => {
  const descriptor = `${planet.climate} ${planet.terrain}`.toLowerCase();

  if (/frozen|glacial|ice|cold|snow/.test(descriptor)) return palettes.frozen;
  if (/volcanic|lava|ash|scorching|flame/.test(descriptor)) return palettes.volcanic;
  if (/ocean|marine|coast|coral|tidal|bay|water/.test(descriptor)) return palettes.oceanic;
  if (/forest|jungle|lush|grass|orchard|fern/.test(descriptor)) return palettes.lush;
  if (/arid|desert|dune|dry|barren|salt/.test(descriptor)) return palettes.desert;
  if (/storm|wind|thunder|electric|charged/.test(descriptor)) return palettes.storm;
  if (/twilight|dim|shadow|nocturnal|moon/.test(descriptor)) return palettes.twilight;

  return palettes.default;
};

const generatePlanetProfile = (planet) => {
  const seed = Math.abs(hashString(`${planet.name}-${planet.diameter}`));
  const diameter = Number(planet.diameter) || 10000;
  const size = Math.min(31, Math.max(17, 14 + diameter / 1150));
  const hasRings = seededRandom(seed + 1) > 0.58;
  const hasClouds = seededRandom(seed + 2) > 0.28;
  const hasAurora = /frozen|storm|electric|cold|wind/i.test(
    `${planet.climate} ${planet.terrain}`
  );
  const tilt = Math.round(seededRandom(seed + 3) * 38 - 19);
  const [light, mid, deep, ice, accent] = getPalette(planet);
  const rotateDuration = Math.round(70 + seededRandom(seed + 4) * 70);
  const cloudDuration = Math.round(38 + seededRandom(seed + 5) * 42);
  const bandAngle = Math.round(80 + seededRandom(seed + 6) * 40);
  const terrainScale = Math.round(56 + seededRandom(seed + 7) * 34);

  return {
    hasAurora,
    hasClouds,
    hasRings,
    className: hasRings ? "has-rings" : "",
    style: {
      "--planet-size": `${size}rem`,
      "--planet-tilt": `${tilt}deg`,
      "--planet-light": light,
      "--planet-mid": mid,
      "--planet-deep": deep,
      "--planet-ice": ice,
      "--planet-accent": accent,
      "--planet-band-angle": `${bandAngle}deg`,
      "--planet-terrain-scale": `${terrainScale}%`,
      "--planet-rotate-duration": `${rotateDuration}s`,
      "--planet-cloud-duration": `${cloudDuration}s`,
      "--ring-color": accent,
      "--ring-shadow": mid,
    },
  };
};

const Planet = ({ planet }) => {
  const navigate = useNavigate();
  const planetProfile = generatePlanetProfile(planet);

  return (
    <div className="planetSec">
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
      <div
        className={`planetSystem ${planetProfile.className}`}
        style={planetProfile.style}
      >
        <div className="orbitGuide orbitGuide-one" />
        <div className="orbitGuide orbitGuide-two" />
        {planetProfile.hasRings && <div className="planetRing planetRing-back" />}
        <div className="planet planetBody">
          <div className="planetTexture" />
          <div className="planetBands" />
          {planetProfile.hasClouds && <div className="planetClouds" />}
          {planetProfile.hasAurora && <div className="planetAurora" />}
          <div className="planetShade" />
          <div className="planetAtmosphere" />
        </div>
        {planetProfile.hasRings && <div className="planetRing planetRing-front" />}
      </div>
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
