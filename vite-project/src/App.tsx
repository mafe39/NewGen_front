import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Layout */
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

/* Pages */
import { Home } from "./pages/Home";
import Colaboradores from "./pages/Colaboradores";
import FolhaDePagamento from "./pages/FolhaDePagamento";

/* Colaboradores */
import EditarColaborador from "./components/colaboradores/EditarColaborador";
import DeletarColaboradores from "./components/colaboradores/DeletarColaboradores";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen flex flex-col ">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/colaboradores" element={<Colaboradores />} />
          <Route path="/folha" element={<FolhaDePagamento />} />

          <Route
            path="/editarcolaborador/:id"
            element={<EditarColaborador />}
          />
          <Route
            path="/deletarcolaborador/:id"
            element={<DeletarColaboradores />}
          />
        </Routes>
      </main>

      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
