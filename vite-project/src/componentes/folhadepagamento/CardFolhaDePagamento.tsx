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

  const [mostrarColab, setMostrarColab] = useState(false)
  const [mostrarFolha, setMostrarFolha] = useState(false)
  const [mostrarPendentes, setMostrarPendentes] = useState(false)

  useEffect(() => {
    buscarDados()
  }, [])

  async function buscarDados() {
    try {
      const rColab = await fetch("http://localhost:3000/colaboradores")
      const rFolha = await fetch("http://localhost:3000/folha-pagamento")

      const colaboradores: Colaborador[] = await rColab.json()
      const folhas: Folha[] = await rFolha.json()

      const ativos = colaboradores.filter(c => c.status === true)
      setTotalColaboradores(ativos.length)

      const soma = folhas.reduce((acc, f) => acc + Number(f.salarioFinal), 0)
      setTotalFolha(Number(soma.toFixed(2)))

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

  function Card({
    titulo,
    icon,
    mostrando,
    setMostrando,
    valor,
    rodape
  }: {
    titulo: string
    icon: React.ReactNode
    mostrando: boolean
    setMostrando: (v: boolean) => void
    valor: React.ReactNode
    rodape?: React.ReactNode
  }) {
    return (
      <div
        onClick={() => setMostrando(!mostrando)}
        className="group bg-white rounded-xl border border-emerald-200 shadow-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-md transition-all"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3 text-emerald-800 font-medium">
            {icon}
            <span>{titulo}</span>
          </div>
        </div>

        <div className="flex items-center justify-center py-6 min-h-[60px]">
          {!mostrando ? (
            <div className="flex flex-col items-center justify-center text-gray-400 select-none transition-all">
              <div className="flex items-center gap-2 text-sm opacity-70 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1">
                <span>Clique para visualizar</span>
                <span className="transition-all duration-300 transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          ) : (
            <div className="text-3xl font-semibold text-gray-900 transition-all duration-300">
              {valor}
            </div>
          )}
        </div>

        {mostrando && rodape && (
          <div
            className="bg-emerald-50 border-t border-emerald-200 px-6 py-3"
            onClick={(e) => e.stopPropagation()} // evita fechar quando clica no botão do rodapé
          >
            {rodape}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      <Card
        titulo="Colaboradores"
        icon={<Users />}
        mostrando={mostrarColab}
        setMostrando={setMostrarColab}
        valor={totalColaboradores ?? "--"}
        rodape={
          <button
            onClick={() => navigate("/colaboradores")}
            className="text-sm text-emerald-800 hover:underline font-medium"
          >
            Ver todos os colaboradores →
          </button>
        }
      />

      <Card
        titulo="Total da Folha"
        icon={<Wallet />}
        mostrando={mostrarFolha}
        setMostrando={setMostrarFolha}
        valor={totalFolha !== null ? formatarDinheiro(totalFolha) : "--"}
        rodape={
          <span className="text-sm text-emerald-800 font-medium opacity-70">
            Ver todas as folhas → (EM BREVE)
          </span>
        }
      />

      <Card
        titulo="Folhas Pendentes"
        icon={<Clock />}
        mostrando={mostrarPendentes}
        setMostrando={setMostrarPendentes}
        valor={pendentes ?? "--"}
        rodape={
          <span className="text-sm text-emerald-800 font-medium opacity-70">
            Ver folhas pendentes → (EM BREVE)
          </span>
        }
      />

    </div>
  )
}
