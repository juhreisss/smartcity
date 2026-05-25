import "./Login.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import Input from "../../components/Input";

import fundo from "../../assets/fundo.png";

import api from "../../services/api";

function Login() {

  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async () => {

      try {

        const res =
          await api.post(
            "/token/",
            {
              username,
              password
            }
          );

        localStorage.setItem(
          "token",
          res.data.access
        );

        localStorage.setItem(
          "refresh",
          res.data.refresh
        );

        localStorage.setItem(
          "usuario",

          JSON.stringify({

            username,

            tipo:
              username === "senai"
                ? "ADMIN"
                : "USUARIO"

          })
        );

        navigate("/home");

      } catch (err) {

        console.log(err);

        alert(
          "Usuário ou senha inválidos"
        );
      }
    };

  return (

    <div
      className="login-container"

      style={{

        backgroundImage: `

          linear-gradient(

            rgba(0,0,0,0.65),

            rgba(0,0,0,0.75)

          ),

          url(${fundo})

        `
      }}
    >

      <Card className="login-card">

        <div className="login-top">

          <h2 className="titulo">
            SmartCity
          </h2>

          <p className="subtitulo">
            Plataforma inteligente
            de sensores
          </p>

        </div>

        <Input
          type="text"
          placeholder="Usuário"

          value={username}

          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <Input
          type="password"
          placeholder="Senha"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Entrar
        </button>

        <p className="cadastro-link">

          Não possui conta?

          <span
            onClick={() =>
              navigate("/cadastro")
            }
          >
            Criar conta
          </span>

        </p>

      </Card>

    </div>
  );
}

export default Login;