import "./Sensor.css";

import { useParams } from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import api from "../../services/api";

function Sensor() {

  const { tipo } = useParams();

  /* ================= STATES ================= */

  const [arquivo, setArquivo] =
    useState(null);

  const [sensores, setSensores] =
    useState([]);

  const [paginaAtual, setPaginaAtual] =
    useState(1);

  const sensoresPorPagina = 8;

  const [novoSensor, setNovoSensor] =
    useState({
      unidade_med: "",
      mic: "",
      status: true
    });

  /* ================= CARREGAR ================= */

  const carregarSensores =
    async () => {

      try {

        const response =
          await api.get(
            `/sensores/por_tipo/?tipo=${tipo}`
          );

        setSensores(
          response.data
        );

      } catch (err) {

        console.log(err);
      }
    };

  useEffect(() => {

    carregarSensores();

  }, [tipo]);

  /* ================= IMPORTAR ================= */

  const importarPlanilha =
    async () => {

      if (!arquivo) {

        alert(
          "Selecione uma planilha"
        );

        return;
      }

      const formData =
        new FormData();

      formData.append(
        "file",
        arquivo
      );

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await fetch(
          "http://127.0.0.1:8000/api/importar-sensores/",
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: formData,
          }
        );

        alert(
          "Planilha importada!"
        );

        carregarSensores();

      } catch (err) {

        console.log(err);

        alert(
          "Erro ao importar"
        );
      }
    };

  /* ================= EXCLUIR ================= */

  const excluirSensor =
    async (id) => {

      const confirmar =
        window.confirm(
          "Deseja excluir esse sensor?"
        );

      if (!confirmar) return;

      try {

        await api.delete(
          `/sensores/${id}/`
        );

        carregarSensores();

      } catch (err) {

        console.log(err);

        alert(
          "Erro ao excluir"
        );
      }
    };

  /* ================= EDITAR ================= */

  const editarSensor =
    async (sensor) => {

      const novaUnidade =
        prompt(
          "Nova unidade:",
          sensor.unidade_med
        );

      if (!novaUnidade) return;

      try {

        await api.patch(
          `/sensores/${sensor.id}/`,
          {
            unidade_med:
              novaUnidade
          }
        );

        carregarSensores();

      } catch (err) {

        console.log(err);

        alert(
          "Erro ao editar"
        );
      }
    };

  /* ================= CADASTRAR ================= */

  const cadastrarSensor =
    async () => {

      if (
        !novoSensor.unidade_med ||
        !novoSensor.mic
      ) {

        alert(
          "Preencha todos os campos"
        );

        return;
      }

      try {

        await api.post(
          "/sensores/",
          {
            sensor: tipo,

            unidade_med:
              novoSensor.unidade_med,

            mic:
              novoSensor.mic,

            status:
              novoSensor.status
          }
        );

        alert(
          "Sensor cadastrado!"
        );

        setNovoSensor({
          unidade_med: "",
          mic: "",
          status: true
        });

        carregarSensores();

      } catch (err) {

        console.log(err);

        alert(
          "Erro ao cadastrar"
        );
      }
    };

  /* ================= PAGINAÇÃO ================= */

  const ultimoIndice =
    paginaAtual *
    sensoresPorPagina;

  const primeiroIndice =
    ultimoIndice -
    sensoresPorPagina;

  const sensoresPagina =
    sensores.slice(
      primeiroIndice,
      ultimoIndice
    );

  const totalPaginas =
    Math.ceil(
      sensores.length /
      sensoresPorPagina
    );

  return (

    <div className="sensor-page">

      {/* HEADER */}

      <div className="sensor-header">

        <div>

          <h1>
            Sensor de {tipo}
          </h1>

          <p>
            Monitoramento inteligente em tempo real
          </p>

        </div>

        <div className="import-box">

          <label className="custom-file-upload">

            <input
              type="file"
              onChange={(e) =>
                setArquivo(
                  e.target.files[0]
                )
              }
            />

            Escolher XLSX

          </label>

          <span className="file-name">

            {arquivo
              ? arquivo.name
              : "Nenhum arquivo"}

          </span>

          <button
            className="import-btn"
            onClick={
              importarPlanilha
            }
          >
            Importar
          </button>

        </div>

      </div>

      {/* CARDS */}

      <div className="cards">

        <div className="card">

          <h2>
            Total Sensores
          </h2>

          <h1>
            {sensores.length}
          </h1>

        </div>

        <div className="card">

          <h2>
            Tipo Monitorado
          </h2>

          <h1>
            {tipo}
          </h1>

        </div>

        <div className="card">

          <h2>
            Sistema
          </h2>

          <h1>
            Online
          </h1>

        </div>

      </div>

      {/* CADASTRO */}

      <div className="cadastro-box">

        <h2>
          Novo Sensor de {tipo}
        </h2>

        <div className="cadastro-form">

          <input
            type="text"
            placeholder="Unidade"
            value={
              novoSensor.unidade_med
            }
            onChange={(e) =>
              setNovoSensor({
                ...novoSensor,
                unidade_med:
                  e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="ID Microcontrolador"
            value={
              novoSensor.mic
            }
            onChange={(e) =>
              setNovoSensor({
                ...novoSensor,
                mic:
                  e.target.value
              })
            }
          />

          <select
            value={
              novoSensor.status
            }
            onChange={(e) =>
              setNovoSensor({
                ...novoSensor,
                status:
                  e.target.value === "true"
              })
            }
          >

            <option value="true">
              Ativo
            </option>

            <option value="false">
              Inativo
            </option>

          </select>

          <button
            onClick={
              cadastrarSensor
            }
          >
            Cadastrar
          </button>

        </div>

      </div>

      {/* TABELA */}

      <div className="table-box">

        <h2>
          Sensores Cadastrados
        </h2>

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Sensor</th>

              <th>Unidade</th>

              <th>Status</th>

              <th>Ações</th>

            </tr>

          </thead>

          <tbody>

            {sensoresPagina.length > 0 ? (

              sensoresPagina.map((s) => (

                <tr key={s.id}>

                  <td>{s.id}</td>

                  <td>{s.sensor}</td>

                  <td>{s.unidade_med}</td>

                  <td>

                    <span
                      className={
                        s.status
                          ? "status-ativo"
                          : "status-inativo"
                      }
                    >
                      {s.status
                        ? "Ativo"
                        : "Inativo"}
                    </span>

                  </td>

                  <td>

                    <div className="acoes">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          editarSensor(s)
                        }
                      >
                        ✏️
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          excluirSensor(s.id)
                        }
                      >
                        🗑️
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="sem-dados"
                >
                  Nenhum sensor encontrado
                </td>

              </tr>

            )}

          </tbody>

        </table>

        {/* PAGINAÇÃO */}
<div className="pagination">

  <button
    className="page-btn"
    disabled={paginaAtual === 1}
    onClick={() => setPaginaAtual(paginaAtual - 1)}
  >
    ←
  </button>

  {Array.from({ length: totalPaginas }).map((_, index) => (
    <button
      key={index}
      className={`page-btn ${
        paginaAtual === index + 1 ? "active" : ""
      }`}
      onClick={() => setPaginaAtual(index + 1)}
    >
      {index + 1}
    </button>
  ))}

  <button
    className="page-btn"
    disabled={paginaAtual === totalPaginas}
    onClick={() => setPaginaAtual(paginaAtual + 1)}
  >
    →
  </button>

</div>

      </div>

    </div>
  );
}

export default Sensor;