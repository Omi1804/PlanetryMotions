import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Background from "./Background/Background";

import Planets from "./Planets/Planets";
import PlanetDetails from "./PlanetDetails/PlanetDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Background />
      <Routes>
        <Route path="/" element={<Planets />} />
        <Route path="/:planet" element={<PlanetDetails />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
