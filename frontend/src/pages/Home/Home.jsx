import "./Home.css";

import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Home() {

  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const data = [
    { hora: "08h", temp: 22, umi: 55 },
    { hora: "10h", temp: 24, umi: 58 },
    { hora: "12h", temp: 27, umi: 52 },
    { hora: "14h", temp: 29, umi: 48 },
    { hora: "16h", temp: 26, umi: 60 },
  ];

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("usuario");

    navigate("/");
  };

  return (

    <div className="dashboard">

      <aside className="sidebar">

        <h2 className="logo">
          SMART TECH
        </h2>

        <p className="subtitle">
          Monitoramento Inteligente
        </p>

        <nav className="menu">

          <button className="menu-btn active">
            🏠 Dashboard
          </button>

          <button className="menu-btn">
            🌡️ Sensores
          </button>

          <button className="menu-btn">
            📈 Gráficos
          </button>

        </nav>

        <button
          className="logout"
          onClick={logout}
        >
          🚪 Sair
        </button>

      </aside>

      <main className="content">

        <div className="topbar">

          <div>

            <h1>
              Dashboard SmartCity
            </h1>

            <p>
              Monitoramento em tempo real
            </p>

          </div>

          <div className="user-info">

            <div>

              <h3>{usuario?.nome}</h3>

              <span>{usuario?.tipo}</span>

            </div>

          </div>

        </div>

        {/* CARDS */}

        <div className="cards">

          <div className="card">

            <h3>🌡️ Temperatura</h3>

            <p>26°C</p>

            <button
              onClick={() =>
                navigate("/sensor/temperatura")
              }
            >
              Ver Sensor
            </button>

          </div>

          <div className="card">

            <h3>💧 Umidade</h3>

            <p>58%</p>

            <button
              onClick={() =>
                navigate("/sensor/umidade")
              }
            >
              Ver Sensor
            </button>

          </div>

          <div className="card">

            <h3>☀️ Luminosidade</h3>

            <p>850 lux</p>

            <button
              onClick={() =>
                navigate("/sensor/luminosidade")
              }
            >
              Ver Sensor
            </button>

          </div>

          <div className="card">

            <h3>🔢 Contador</h3>

            <p>1450</p>

            <button
              onClick={() =>
                navigate("/sensor/contador")
              }
            >
              Ver Sensor
            </button>

          </div>

        </div>

        {/* GRÁFICO */}

        <div className="chart-box">

          <h2>
            Monitoramento Geral
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={data}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="hora" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="temp"
              />

              <Line
                type="monotone"
                dataKey="umi"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </main>

    </div>
  );
}

export default Home;