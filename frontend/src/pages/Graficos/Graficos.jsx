import "./Graficos.css";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

import {
  useState
} from "react";

function Graficos() {

  const [tipoGrafico, setTipoGrafico] =
    useState("temperatura");

  const [periodo, setPeriodo] =
    useState("24h");

  /* DADOS */

  const temperaturaData = [
    { hora: "08h", valor: 22 },
    { hora: "10h", valor: 24 },
    { hora: "12h", valor: 26 },
    { hora: "14h", valor: 28 },
    { hora: "16h", valor: 30 },
  ];

  const umidadeData = [
    { hora: "08h", valor: 52 },
    { hora: "10h", valor: 58 },
    { hora: "12h", valor: 61 },
    { hora: "14h", valor: 66 },
    { hora: "16h", valor: 70 },
  ];

  const luminosidadeData = [
    { hora: "08h", valor: 300 },
    { hora: "10h", valor: 520 },
    { hora: "12h", valor: 700 },
    { hora: "14h", valor: 850 },
    { hora: "16h", valor: 920 },
  ];

  const contadorData = [
    { hora: "08h", valor: 10 },
    { hora: "10h", valor: 22 },
    { hora: "12h", valor: 40 },
    { hora: "14h", valor: 55 },
    { hora: "16h", valor: 80 },
  ];

  const statusData = [
    {
      name: "Ativos",
      value: 18
    },
    {
      name: "Inativos",
      value: 4
    }
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444"
  ];

  /* TROCAR DADOS */

  const pegarDados = () => {

    switch (tipoGrafico) {

      case "temperatura":
        return temperaturaData;

      case "umidade":
        return umidadeData;

      case "luminosidade":
        return luminosidadeData;

      case "contador":
        return contadorData;

      default:
        return temperaturaData;
    }
  };

  const dados =
    pegarDados();

  /* IMPORTAR */

  const importarXLSX = () => {

    alert(
      "Importação XLSX realizada!"
    );
  };

  /* HISTÓRICO */

  const verHistorico = () => {

    alert(
      `Mostrando histórico de ${tipoGrafico} (${periodo})`
    );
  };

  /* EXPORTAR */

  const exportarDados = () => {

    const texto =
      JSON.stringify(
        dados,
        null,
        2
      );

    const blob =
      new Blob(
        [texto],
        {
          type:
            "application/json"
        }
      );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const a =
      document.createElement("a");

    a.href = url;

    a.download =
      "dados_sensores.json";

    a.click();
  };

  return (

    <div className="graficos-page">

      {/* HEADER */}

      <div className="graf-header">

        <div>

          <h1>
            Dashboard de Gráficos
          </h1>

          <p>
            Monitoramento inteligente dos sensores
          </p>

        </div>

        <div className="header-buttons">

          <button
            onClick={importarXLSX}
          >
            Importar XLSX
          </button>

          <button
            onClick={verHistorico}
          >
            Ver Histórico
          </button>

          <button
            onClick={exportarDados}
          >
            Exportar
          </button>

        </div>

      </div>

      {/* CARDS */}

      <div className="cards-grid">

        <div className="info-card">

          <h3>
            Média Temperatura
          </h3>

          <h1>
            28°C
          </h1>

        </div>

        <div className="info-card">

          <h3>
            Média Umidade
          </h3>

          <h1>
            64%
          </h1>

        </div>

        <div className="info-card">

          <h3>
            Sensores Online
          </h3>

          <h1>
            18
          </h1>

        </div>

        <div className="info-card">

          <h3>
            Sistema
          </h3>

          <h1>
            Online
          </h1>

        </div>

      </div>

      {/* FILTROS */}

      <div className="filtros">

        <button
          onClick={() =>
            setPeriodo("Hoje")
          }
        >
          Hoje
        </button>

        <button
          onClick={() =>
            setPeriodo("24h")
          }
        >
          24h
        </button>

        <button
          onClick={() =>
            setPeriodo("7 dias")
          }
        >
          7 dias
        </button>

        <button
          onClick={() =>
            setPeriodo("30 dias")
          }
        >
          30 dias
        </button>

        <select
          value={tipoGrafico}
          onChange={(e) =>
            setTipoGrafico(
              e.target.value
            )
          }
        >

          <option value="temperatura">
            Temperatura
          </option>

          <option value="umidade">
            Umidade
          </option>

          <option value="luminosidade">
            Luminosidade
          </option>

          <option value="contador">
            Contador
          </option>

        </select>

      </div>

      {/* GRID */}

      <div className="graf-grid">

        {/* LINHA */}

        <div className="graf-box big">

          <div className="box-top">

            <h2>
              {tipoGrafico}
              {" "}
              em Tempo Real
            </h2>

            <span>
              {periodo}
            </span>

          </div>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <LineChart data={dados}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis dataKey="hora" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="valor"
                stroke="#3b82f6"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* PIZZA */}

        <div className="graf-box">

          <div className="box-top">

            <h2>
              Status Sensores
            </h2>

          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <PieChart>

              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >

                {statusData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[index]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* BARRAS */}

      <div className="graf-box barra-box">

        <div className="box-top">

          <h2>
            Comparativo dos Sensores
          </h2>

        </div>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={dados}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis dataKey="hora" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="valor"
              fill="#06b6d4"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Graficos;