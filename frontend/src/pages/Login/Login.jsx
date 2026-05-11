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

    console.log(username, password);

    try {

      const res = await api.post("/token/", {
        username,
        password
      });

      // SALVA TOKEN
      localStorage.setItem(
        "token",
        res.data.access
      );

      // 🔥 salva usuário fake temporário
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          nome: username,
          tipo: "Administrador"
        })
      );

      alert("Login realizado!");

      navigate("/home");

    } catch (err) {

      console.log(err);

      alert("Usuário ou senha inválidos");

    }
  };

  return (

    <div className="container">

      <Card>

        <h2>
          Bem vindo ao <span>SMART TECH</span>
        </h2>

        <Input
          type="text"
          placeholder="Usuário"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="options">
          <span className="forgot">
            esqueci minha senha
          </span>
        </div>

        <Button
          text="Entrar"
          onClick={handleLogin}
        />

      </Card>

    </div>
  );
}

export default Login;