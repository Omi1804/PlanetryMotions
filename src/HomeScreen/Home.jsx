import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigte = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Set the duration of the typing effect here (e.g., 5000 ms = 5 seconds)
    const typingDuration = 8000;
    const timer = setTimeout(() => {
      setShowButton(true);
    }, typingDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="homeSec">
      <div className="note">
        <p className="typingEffect">
          Embark on an extraordinary journey through a realm of self-generated
          and fictional planets. Let us delve into the wonders that await!
        </p>
      </div>
      {showButton && (
        <button className="startbtn" onClick={() => navigte("/planets")}>
          Let's Explore!
        </button>
      )}
    </div>
  );
};

export default Home;
