import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function RobotDetailPage() {
  const { id } = useParams();
  const [robot, setRobot] = useState(null);
  const [error, setError] = useState("");

  const getImageUrl = (url) => {
    if (url.includes("github.com") && url.includes("/blob/")) {
      return url.replace("github.com", "raw.githubusercontent.com").replace("/blob", "");
    }
    return url;
  };

  useEffect(() => {
    fetch(`http://localhost:3001/robots/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener info del robot");
        }
        return response.json();
      })
      .then((data) => setRobot(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/robots" className="btn btn-primary mt-2">
          Volver al listado
        </Link>
      </div>
    );
  }

  if (!robot) {
    return (
      <div className="container mt-4">
        <p>Cargando detalles...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Detalle del Robot: {robot.nombre}</h1>
      <div className="card mb-4">
        {robot.imagen && (
          <img
            src={getImageUrl(robot.imagen)}
            className="card-img-top"
            alt={robot.nombre}
            style={{ maxWidth: "400px", margin: "0 auto" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{robot.modelo}</h5>
          <p className="card-text">
            <strong>Empresa Fabricante:</strong> {robot.empresaFabricante}
          </p>
          <p className="card-text">
            <strong>Año de Fabricación:</strong> {robot.añoFabricacion}
          </p>
          <p className="card-text">
            <strong>Capacidad de Procesamiento:</strong> {robot.capacidadProcesamiento}
          </p>
          <p className="card-text">
            <strong>Características Adicionales:</strong> {robot.humor}
          </p>
          <Link to="/robots" className="btn btn-primary">
            Volver al listado
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RobotDetailPage;

