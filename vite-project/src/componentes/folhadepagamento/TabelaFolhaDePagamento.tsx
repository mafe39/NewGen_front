import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DeletarFolhaDePagamento from "./DeletarFolhaDePagamento"
import type { FolhaDePagamento } from "../../models/FolhaDePagamento"
import { Eye, EyeOff } from "lucide-react"

function formatarDinheiro(valor: any) {
  return Number(valor).toFixed(2)
}

interface Props {
  folhas: FolhaDePagamento[]
  recarregar: () => void
  onEditar: (folha: FolhaDePagamento) => void
}

export default function TabelaFolhaDePagamento({
  folhas,
  recarregar,
  onEditar
}: Props) {
  const navigate = useNavigate()

  //controla quais linhas estão visíveis
  const [abertos, setAbertos] = useState<Record<number, boolean>>({})

  function toggleLinha(id: number) {
    setAbertos(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  function renderValor(
    visivel: boolean,
    valor: React.ReactNode,
    placeholder = "••••••"
  ) {
    return (
      <span
        className={`inline-block transition-all duration-200 ${
          visivel ? "blur-0 opacity-100" : "blur-sm opacity-60 select-none"
        }`}
      >
        {visivel ? valor : placeholder}
      </span>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-center">
        <thead>
          <tr className="border-b border-emerald-200 text-emerald-900">
            <th className="py-3">Colaborador</th>
            <th>Horas</th>
            <th>Valor Hora</th>
            <th>Descontos</th>
            <th>Bônus</th>
            <th>Salário Final</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {folhas.map(folha => {
            const aberto = !!abertos[folha.id] //aqui tem nomes, horas, valor hora,... da lista

            return (
              <tr
                key={folha.id}
                className="border-b border-emerald-100 hover:bg-emerald-50 transition"
              >
                <td
                  onClick={() =>
                    navigate(`/colaboradores/${folha.colaboradores.id}`)
                  }
                  className="py-3 px-3 cursor-pointer text-emerald-800 font-medium hover:underline"
                >
                  {folha.colaboradores.nome}
                </td>

                <td>
                  {renderValor(aberto, folha.totalHoras, "•••")}
                </td>

                <td>
                  {renderValor(
                    aberto,
                    <>R$ {formatarDinheiro(folha.valorHora)}</>,
                    "R$ ••••"
                  )}
                </td>

                <td className="text-red-600">
                  {renderValor(
                    aberto,
                    <>- R$ {formatarDinheiro(folha.descontos)}</>,
                    "- R$ ••••"
                  )}
                </td>

                <td className="text-emerald-700">
                  {renderValor(
                    aberto,
                    <>+ R$ {formatarDinheiro(folha.bonus)}</>,
                    "+ R$ ••••"
                  )}
                </td>

                <td className="font-semibold">
                  {renderValor(
                    aberto,
                    <>R$ {formatarDinheiro(folha.salarioFinal)}</>,
                    "R$ ••••••"
                  )}
                </td>

                <td className="space-x-2">
                  <button //botao de olho para mostrar os valores do funcionario
                    onClick={() => toggleLinha(folha.id)}
                    className="inline-flex items-center justify-center p-2 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition"
                    title={aberto ? "Ocultar valores" : "Mostrar valores"}
                  >
                    {aberto ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>

                  <button 
                    onClick={() => onEditar(folha)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded-lg"
                  >
                    Editar
                  </button>

                  <DeletarFolhaDePagamento
                    id={folha.id}
                    aoDeletar={recarregar}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
