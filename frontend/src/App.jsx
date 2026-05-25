import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Sensor from "./pages/Sensor/Sensor";
import Graficos from "./pages/Graficos/Graficos";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* CADASTRO */}

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        {/* HOME */}

        <Route
          path="/home"
          element={<Home />}
        />

        {/* SENSORES */}

        <Route
          path="/sensor/:tipo"
          element={<Sensor />}
        />

        {/* GRAFICOS */}

        <Route
          path="/graficos"
          element={<Graficos />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;