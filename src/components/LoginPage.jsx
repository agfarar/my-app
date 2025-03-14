import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.ok) {
        
        navigate("/robots"); 
      } else if (response.status === 401) {
        
        setError("Error de autenticación. Revise sus credenciales");
      } else {
        setError("Ocurrió un error inesperado");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <h1>Adopta un Robot con Robot Lovers!</h1>
      <h2>Inicio de sesión</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de usuario: </label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Ingrese su usuario"
            required
          />
        </div>

        <div>
          <label>Contraseña: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>

        {error && (
          <div style={{ color: "red", marginTop: 10 }}>
            {error}
          </div>
        )}

        <button type="submit">Ingresar</button>
        <button type="button" onClick={() => {
          setLogin("");
          setPassword("");
          setError("");
        }}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
