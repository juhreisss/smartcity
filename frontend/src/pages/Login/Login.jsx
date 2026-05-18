import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";

import api from "../../services/api";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      console.log(username, password);

      const res = await api.post(
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

      navigate("/home");

    } catch (err) {

      console.log(err);

      alert("Usuário ou senha inválidos");
    }
  };

  return (

    <div className="login-container">

      <Card>

        <h2 className="titulo">
          SmartCity Login
        </h2>

        <Input
          type="text"
          placeholder="Usuário"
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <Button
          text="Entrar"
          onClick={handleLogin}
        />

        <p className="cadastro-link">

          Não tem conta?

          <span
            onClick={() =>
              navigate("/cadastro")
            }
          >
            Cadastre-se
          </span>

        </p>

      </Card>

    </div>
  );
}

export default Login;