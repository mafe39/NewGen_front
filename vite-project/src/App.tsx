import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      {/* CONTEÚDO DA PÁGINA */}
      <main className="min-h-screen px-6">
        {/* suas rotas ou páginas aqui */}
      </main>

      <Footer />
    </>
  );
}

export default App;
