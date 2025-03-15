import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const intl = useIntl();

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
      <h1>
        <FormattedMessage id="adoptionTitle" />
      </h1>
      <h2>
        <FormattedMessage id="loginTitle" />
      </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <FormattedMessage id="username" />
          </label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder={intl.formatMessage({ id: "username" })}
            required
          />
        </div>

        <div>
          <label>
            <FormattedMessage id="password" />
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={intl.formatMessage({ id: "password" })}
            required
          />
        </div>

        {error && (
          <div style={{ color: "red", marginTop: 10 }}>
            {error}
          </div>
        )}

        <button type="submit">
          <FormattedMessage id="loginTitle" />
        </button>
        <button
          type="button"
          onClick={() => {
            setLogin("");
            setPassword("");
            setError("");
          }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;