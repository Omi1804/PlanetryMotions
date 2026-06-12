import "./resident.css";

const ResidentInfo = ({ resident }) => {
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
