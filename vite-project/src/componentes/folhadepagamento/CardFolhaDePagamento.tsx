import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Users, Wallet, Clock } from "lucide-react"

interface Colaborador {
  id: number
  nome: string
  status: boolean
}

interface Folha {
  id: number
  salarioFinal: number
  colaboradores: {
    id: number
  }
}

export default function CardFolhaDePagamento() {
  const navigate = useNavigate()

  const [totalColaboradores, setTotalColaboradores] = useState<number | null>(null)
  const [totalFolha, setTotalFolha] = useState<number | null>(null)
  const [pendentes, setPendentes] = useState<number | null>(null)

  useEffect(() => {
    buscarDados()
  }, [])

  async function buscarDados() {
    try {
      const rColab = await fetch("http://localhost:3000/colaboradores")
      const rFolha = await fetch("http://localhost:3000/folha-pagamento")

      const colaboradores: Colaborador[] = await rColab.json()
      const folhas: Folha[] = await rFolha.json()

      //colaboradores ativos
      const ativos = colaboradores.filter(c => c.status === true)

      setTotalColaboradores(ativos.length)

      //total das folhas
      const soma = folhas.reduce((acc, f) => acc + Number(f.salarioFinal), 0)
      setTotalFolha(Number(soma.toFixed(2)))

      //quem NAO tem folha/pendente lancamento
      const idsComFolha = new Set(folhas.map(f => f.colaboradores.id))

      const semFolha = ativos.filter(c => !idsComFolha.has(c.id))

      setPendentes(semFolha.length)

    } catch (e) {
      console.warn("Backend não disponível para os cards")
    }
  }

  function formatarDinheiro(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className="bg-white rounded-xl border border-emerald-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
        <div className="flex">
          <div className="w-2 bg-emerald-700" />
          <div className="p-6 flex flex-col justify-between w-full min-h-[150px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base text-emerald-800 font-medium">
                  Colaboradores
                </p>
                <p className="text-3xl font-semibold text-gray-900 mt-1">
                  {totalColaboradores ?? "--"}
                </p>
              </div>
              <Users className="text-emerald-700" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border-t border-emerald-200 px-6 py-3">
          <button
            onClick={() => navigate("/colaboradores")}
            className="text-sm text-emerald-800 hover:underline font-medium"
          >
            Ver todos os colaboradores →
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-emerald-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
        <div className="flex">
          <div className="w-2 bg-emerald-700" />
          <div className="p-6 flex flex-col justify-between w-full min-h-[150px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base text-emerald-800 font-medium">
                  Total da Folha
                </p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {totalFolha !== null ? formatarDinheiro(totalFolha) : "--"}
                </p>
              </div>
              <Wallet className="text-emerald-700" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border-t border-emerald-200 px-6 py-3">
          <span className="text-sm text-emerald-800 font-medium opacity-70">
            Ver todas as folhas → (EM BREVE)
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-emerald-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
        <div className="flex">
          <div className="w-2 bg-emerald-700" />
          <div className="p-6 flex flex-col justify-between w-full min-h-[150px]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base text-emerald-800 font-medium">
                  Folhas Pendentes
                </p>
                <p className="text-3xl font-semibold text-gray-900 mt-1">
                  {pendentes ?? "--"}
                </p>
              </div>
              <Clock className="text-emerald-700" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border-t border-emerald-200 px-6 py-3">
          <span className="text-sm text-emerald-800 font-medium opacity-70">
            Ver folhas pendentes → (EM BREVE)
          </span>
        </div>
      </div>

    </div>
  )
}
  