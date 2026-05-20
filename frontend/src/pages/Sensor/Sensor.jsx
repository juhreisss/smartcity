import "./Sensor.css";

import { useParams } from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import api from "../../services/api";

function Sensor() {

  const { tipo } = useParams();

  /* ================= USUARIO ================= */

  const usuario =
    JSON.parse(
      localStorage.getItem("usuario")
    );

  /* ADMIN */

  const isAdmin =
    usuario?.tipo === "ADMIN";

  /* STATES */

  const [arquivo, setArquivo] =
    useState(null);

  const [sensores, setSensores] =
    useState([]);

  const [novoSensor, setNovoSensor] =
    useState({
      unidade_med: "",
      mic: ""
    });

  /* ================= CARREGAR ================= */

  const carregarSensores =
    async () => {

      try {

        const response =
          await api.get(
            `/sensores/por_tipo/?tipo=${tipo}`
          );

        setSensores(response.data);

      } catch (err) {

        console.log(err);
      }
    };

  useEffect(() => {

    carregarSensores();

  }, []);

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
            status: true
          }
        );

        alert(
          "Sensor cadastrado!"
        );

        setNovoSensor({
          unidade_med: "",
          mic: ""
        });

        carregarSensores();

      } catch (err) {

        console.log(err);

        alert(
          "Erro ao cadastrar"
        );
      }
    };
  }
    export default Sensor;

