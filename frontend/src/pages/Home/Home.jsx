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

      {/* SIDEBAR */}

      <aside className="sidebar">

        <h2>SMART TECH</h2>

        <nav>

          <a href="#">Dashboard</a>

          <a href="#">Sensores</a>

          <a href="#">Histórico</a>

          <a href="#">Gráficos</a>

        </nav>

        <button
          className="logout"
          onClick={logout}
        >
          Sair
        </button>

      </aside>

      {/* CONTEÚDO */}

      <main className="content">

        {/* USUÁRIO */}

        <div className="user-info">

          <h3>{usuario?.nome}</h3>

          <span>{usuario?.tipo}</span>

        </div>

        <h1>Dashboard SmartCity</h1>

        {/* CARDS */}

        <div className="cards">

          <div className="card temp">
            <h3>🌡️ Temperatura</h3>
            <p>26°C</p>

            <button>
              Ver Sensor
            </button>
          </div>

          <div className="card umi">
            <h3>💧 Umidade</h3>
            <p>58%</p>

            <button>
              Ver Sensor
            </button>
          </div>

          <div className="card lux">
            <h3>☀️ Luminosidade</h3>
            <p>850 lux</p>

            <button>
              Ver Sensor
            </button>
          </div>

          <div className="card cont">
            <h3>🔢 Contador</h3>
            <p>1450</p>

            <button>
              Ver Sensor
            </button>
          </div>

        </div>

        {/* BOTÕES ADMIN */}

        {usuario?.tipo === "Administrador" && (

          <div className="admin-actions">

            <button>
              ➕ Cadastrar Sensor
            </button>

            <button>
              📥 Importar Planilha
            </button>

          </div>

        )}

        {/* GRÁFICO */}

        <div className="chart-box">

          <h2>Monitoramento</h2>

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