import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

interface Colaborador {
  nome: string
  cargo: string
  email: string
}

export default function Colaboradores() {
  const { id } = useParams()
  const [colaborador, setColaborador] = useState<Colaborador | null>(null)

  useEffect(() => {
    fetch(`http://localhost:8080/colaboradores/${id}`)
      .then(res => res.json())
      .then(setColaborador)
  }, [id])

  if (!colaborador) return <p>Carregando...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold">{colaborador.nome}</h2>
      <p>{colaborador.cargo}</p>
      <p>{colaborador.email}</p>
    </div>
  )
}
