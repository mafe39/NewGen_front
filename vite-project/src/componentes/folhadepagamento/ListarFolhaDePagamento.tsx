import { useEffect, useState } from "react"
import TabelaFolhaDePagamento from "./TabelaFolhaDePagamento"
import ModalFolhaDePagamento from "./ModalFolhadePagamento"
import { FolhaDePagamento } from "../../models/FolhaDePagamento"
import { listarFolhasPagamento } from "../../service/Service"

export default function ListarFolhaDePagamento() {
  //inicia a lista aberta
  const [aberto, setAberto] = useState(true)
  const [folhas, setFolhas] = useState<FolhaDePagamento[]>([])
  const [carregando, setCarregando] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [folhaEditando, setFolhaEditando] =
    useState<FolhaDePagamento | null>(null)

  //ja carrega ao entrar na página
  useEffect(() => {
    carregarFolhas()
  }, [])

  async function carregarFolhas() {
    try {
      setCarregando(true)
      const dados = await listarFolhasPagamento()
      setFolhas(dados)
    } catch (e) {
      alert("Backend não disponível")
    } finally {
      setCarregando(false)
    }
  }

  function clicar() {
    setAberto(prev => !prev)
  }

  function abrirNovaFolha() {
    setFolhaEditando(null)
    setModalAberto(true)
  }

  function abrirEdicao(folha: FolhaDePagamento) {
    setFolhaEditando(folha)
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setFolhaEditando(null)
  }

  return (
    <div className="bg-white rounded-2xl shadow border border-emerald-200 mt-8 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-5 border-b border-emerald-200 bg-emerald-50">
        <button
          onClick={clicar}
          className="text-emerald-800 font-medium hover:underline"
        >
          {aberto ? "Ocultar folhas" : "Mostrar folhas"}
        </button>

        <button
          onClick={abrirNovaFolha}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Nova Folha
        </button>
      </div>

      {aberto && (
        <div className="p-6">
          {carregando ? (
            <p className="text-emerald-700">Carregando...</p>
          ) : folhas.length === 0 ? (
            <p className="text-emerald-700">
              Nenhuma folha de pagamento encontrada.
            </p>
          ) : (
            <TabelaFolhaDePagamento
              folhas={folhas}
              recarregar={carregarFolhas}
              onEditar={abrirEdicao}
            />
          )}
        </div>
      )}

      <ModalFolhaDePagamento
        aberto={modalAberto}
        onFechar={fecharModal}
        aoSalvar={carregarFolhas}
        folha={folhaEditando}
      />
    </div>
  )
}
