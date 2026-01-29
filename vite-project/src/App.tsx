import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"

import { Home } from "./pages/Home"
import FolhaDePagamento from "./pages/FolhaDePagamento"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-screen px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/folha" element={<FolhaDePagamento />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
