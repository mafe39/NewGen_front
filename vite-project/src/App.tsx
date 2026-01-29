import { BrowserRouter, Routes, Route } from "react-router-dom"
import FolhaDePagamento from "./pages/FolhaDePagamento"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FolhaDePagamento />} />
      </Routes>
    </BrowserRouter>
  )
}
