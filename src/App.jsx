import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Background from "./Background/Background";

import Planets from "./Planets/Planets";
import PlanetDetails from "./PlanetDetails/PlanetDetails";
import Home from "./HomeScreen/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Background />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/:planet" element={<PlanetDetails />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
