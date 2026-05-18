import "./Cadastro.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";

import fundo from "../../assets/fundo.png";

import api from "../../services/api";

function Cadastro() {

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("Usuario");

  const handleCadastro = async () => {

    try {

      await api.post("/register/", {

        username,
        email: `${username}@gmail.com`,
        password,

        nome,
        telefone: "",

        tipo:
          tipo === "Administrador"
            ? "ADMIN"
            : "USUARIO"

      });

      alert("Usuário cadastrado!");

      navigate("/");

    } catch (err) {

      console.log(err.response?.data);

      alert("Erro ao cadastrar");

    }
  };

  return (

    <div
      className="cadastro-container"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.5),
            rgba(0,0,0,0.5)
          ),
          url(${fundo})
        `
      }}
    >

      <Card>

        <h2 className="titulo">
          Criar Conta
        </h2>

        <Input
          type="text"
          placeholder="Nome"
          onChange={(e) => setNome(e.target.value)}
        />

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

        <select
          className="select"
          onChange={(e) => setTipo(e.target.value)}
        >

          <option value="Usuario">
            Usuário
          </option>

          <option value="Administrador">
            Administrador
          </option>

        </select>

        <Button
          text="Cadastrar"
          onClick={handleCadastro}
        />

        <p className="voltar">

          Já possui conta?

          <span onClick={() => navigate("/")}>
            Fazer login
          </span>

        </p>

      </Card>

    </div>
  );
}

export default Cadastro;