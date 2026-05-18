import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Sensor from "./pages/Sensor/Sensor";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/sensor/:tipo"
          element={<Sensor />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;