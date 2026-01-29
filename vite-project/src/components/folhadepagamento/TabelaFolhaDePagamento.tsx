import { useNavigate } from "react-router-dom"
import DeletarFolhaDePagamento from "./DeletarFolhaDePagamento"
import type { FolhaDePagamento } from "../../models/FolhaDePagamento"

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
          {folhas.map(folha => (
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

              <td>{folha.totalHoras}</td>
              <td>R$ {formatarDinheiro(folha.valorHora)}</td>

              <td className="text-red-600">
                - R$ {formatarDinheiro(folha.descontos)}
              </td>

              <td className="text-emerald-700">
                + R$ {formatarDinheiro(folha.bonus)}
              </td>

              <td className="font-semibold">
                R$ {formatarDinheiro(folha.salarioFinal)}
              </td>

              <td className="space-x-3">
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
          ))}
        </tbody>
      </table>
    </div>
  )
}
