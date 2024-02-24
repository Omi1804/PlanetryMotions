import React, { useState, useEffect } from "react";
import "./resident.css";

const ResidentInfo = ({ url }) => {
  const [resident, setResident] = useState(null);

  useEffect(() => {
    const fetchResident = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setResident(data);
    };

    fetchResident();
  }, [url]);

  if (!resident) return <div className="loading">Loading...</div>;

  return (
    <div className="residentInfo">
      <h3>{resident.name}</h3>
      <div>
        Height: <span>{resident.height}</span>
      </div>
      <div>
        Mass: <span>{resident.mass}</span>
      </div>
      <div>
        Gender: <span>{resident.gender}</span>
      </div>
    </div>
  );
};

export default ResidentInfo;
