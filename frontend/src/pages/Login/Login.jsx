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
      const res = await api.post("/token/", {
        username: username,
        password: password
      });

    
      localStorage.setItem("token", res.data.access);

      alert("Login realizado!");
      navigate("/home");

    } catch (err) {
      alert("Usuário ou senha inválidos");
      console.log(err);
    }
  };

  return (
    <div className="container">
      <Card>

        <h2>
          Bem vindo ao <span>SMART TECH</span>
        </h2>

        {/* 🔥 IMPORTANTE: pegar valor */}
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
          <span className="forgot">esqueci minha senha</span>
        </div>

        <Button text="Entrar" onClick={handleLogin} />

        <p className="signup">
          Não tem conta? <span>Criar uma conta</span>
        </p>
      </Card>
    </div>
  );
}

export default Login;