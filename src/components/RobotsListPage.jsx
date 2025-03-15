import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

function RobotsListPage() {
  const [robots, setRobots] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/robots")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los robots");
        }
        return response.json();
      })
      .then((data) => setRobots(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleNameClick = (id) => {
    navigate(`/robots/${id}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">
        <FormattedMessage id="robotListTitle" />
      </h1>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th><FormattedMessage id="name" /></th>
              <th><FormattedMessage id="model" /></th>
              <th><FormattedMessage id="manufacturer" /></th>
            </tr>
          </thead>
          <tbody>
            {robots.map((robot) => (
              <tr key={robot.id}>
                <td>
                  <span 
                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => handleNameClick(robot.id)}
                  >
                    {robot.nombre}
                  </span>
                </td>
                <td>{robot.modelo}</td>
                <td>{robot.empresaFabricante}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RobotsListPage;
