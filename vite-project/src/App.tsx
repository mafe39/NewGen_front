import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditarColaborador from "./components/colaboradores/EditarColaborador";
import DeletarColaboradores from "./components/colaboradores/DeletarColaboradores";
import { Footer } from "./components/Footer";

import FolhaDePagamento from "./pages/FolhaDePagamento";
import { Navbar } from "./components/Navbar";

import ListaColaboradores from "./components/colaboradores/ListaColaboradores";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen flex flex-col pt-28">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/colaboradores" element={<ListaColaboradores />} />
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
