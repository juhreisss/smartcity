import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

import PrivateRoute from "./routes/PrivateRoute";

function App() {

  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default App;