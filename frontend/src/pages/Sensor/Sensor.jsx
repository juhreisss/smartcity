import "./Sensor.css";

import { useParams } from "react-router-dom";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { useState } from "react";

function Sensor() {

  const { tipo } = useParams();

  const [arquivo, setArquivo] =
    useState(null);

  const data = [
    { hora: "08h", valor: 20 },
    { hora: "10h", valor: 24 },
    { hora: "12h", valor: 26 },
    { hora: "14h", valor: 28 },
    { hora: "16h", valor: 25 },
  ];

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

        console.log(
          "TOKEN:",
          token
        );

        const response =
          await fetch(
            "http://127.0.0.1:8000/api/importar-historico/",
            {

              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },

              body: formData,
            }
          );

        console.log(response);

        if (response.ok) {

          alert(
            "Planilha importada!"
          );

        } else {

          alert(
            "Erro ao importar"
          );

          console.log(
            await response.text()
          );
        }

      } catch (err) {

        console.log(err);

        alert(
          "Erro no sistema"
        );
      }
    };

  return (

    <div className="sensor-page">

      <div className="sensor-header">

        <div>

          <h1>
            Sensor de {tipo}
          </h1>

          <p>
            Monitoramento e importação
          </p>

        </div>

        <div className="import-box">

          <input
            type="file"
            onChange={(e) =>
              setArquivo(
                e.target.files[0]
              )
            }
          />

          <button
            onClick={
              importarPlanilha
            }
          >
            Importar XLSX
          </button>

        </div>

      </div>

      <div className="chart-box">

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="hora" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="valor"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      <div className="table-box">

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Sensor</th>

              <th>Valor</th>

              <th>Data</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>1</td>

              <td>{tipo}</td>

              <td>26</td>

              <td>18/05/2026</td>

            </tr>

            <tr>

              <td>2</td>

              <td>{tipo}</td>

              <td>28</td>

              <td>18/05/2026</td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Sensor;