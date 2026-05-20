import "./Home.css";

import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
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

        <div>

          <div className="logo-box">

            <h1 className="logo">
              SMARTCITY
            </h1>


          </div>


        </div>

        <nav className="menu">

          <button
            className="menu-btn active"
          >
            Dashboard
          </button>

          <button
            className="menu-btn"
            onClick={() =>
              navigate("/cadastro")
            }
          >
            Área de Cadastro
          </button>

          <button
            className="menu-btn"
          >
            Gráficos
          </button>

        </nav>

        <div className="sidebar-footer">

          <div className="perfil-box">

            <div className="perfil-circle">
              {usuario?.nome?.[0]}
            </div>

            <div>

              <h3>
                {usuario?.nome}
              </h3>

              <span>
                {usuario?.tipo}
              </span>

            </div>

          </div>

          <button
            className="logout"
            onClick={logout}
          >
            Sair do Sistema
          </button>

        </div>

      </aside>

      {/* CONTEÚDO */}

      <main className="content">

        {/* HEADER */}

        <div className="topbar">

          <div>

            <h1>
              Dashboard Inteligente
            </h1>

            <p>
              Controle total dos sensores da SMARTECH
            </p>

          </div>

        </div>

        {/* CARDS */}

        <div className="cards">

          <div className="card card-temp">

            <div>

              <h3>Temperatura</h3>

              <p>26°C</p>

            </div>

            <button
              onClick={() =>
                navigate("/sensor/temperatura")
              }
            >
              Ver Sensor
            </button>

          </div>

          <div className="card card-umi">

            <div>

              <h3>Umidade</h3>

              <p>58%</p>

            </div>

            <button
              onClick={() =>
                navigate("/sensor/umidade")
              }
            >
              Ver Sensor
            </button>

          </div>

          <div className="card card-lux">

            <div>

              <h3>Luminosidade</h3>

              <p>850 lux</p>

            </div>

            <button
              onClick={() =>
                navigate("/sensor/luminosidade")
              }
            >
              Ver Sensor
            </button>

          </div>

          <div className="card card-cont">

            <div>

              <h3>Contador</h3>

              <p>1450</p>

            </div>

            <button
              onClick={() =>
                navigate("/sensor/contador")
              }
            >
              Ver Sensor
            </button>

          </div>

        </div>

        {/* GRID */}

        <div className="dashboard-grid">

          {/* GRÁFICO */}

          <div className="chart-box">

            <div className="box-header">

              <h2 className="titulo-grafico">
               Monitoramento Geral
                </h2>

              <span>
                Últimas 24h
              </span>

            </div>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <LineChart data={data}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#2b3655"
                />

                <XAxis dataKey="hora" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#7c5cff"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="umi"
                  stroke="#00d4ff"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>


        </div>

        {/* ÁREA INFERIOR */}

        <div className="bottom-grid">

          <div className="mini-chart">

            <div className="box-header">

              

            </div>

            <ResponsiveContainer
              width="100%"
              height={180}
            >

              <AreaChart data={data}>

                <defs>

                  <linearGradient
                    id="colorTemp"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="5%"
                      stopColor="#7c5cff"
                      stopOpacity={0.8}
                    />

                    <stop
                      offset="95%"
                      stopColor="#7c5cff"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <XAxis dataKey="hora" />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#7c5cff"
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>


        </div>

      </main>

    </div>
  );
}

export default Home;