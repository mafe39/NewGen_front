import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6">
        <Home />
      </main>

      <Footer />
    </>
  );
}

export default App;
