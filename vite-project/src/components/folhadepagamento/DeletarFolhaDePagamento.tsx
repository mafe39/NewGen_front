import { deletarFolhaPagamento } from "../../service/Service"

interface Props {
  id: number
  aoDeletar: () => void
  variante?: "texto" | "botao"
}

export default function DeletarFolhaDePagamento({
  id,
  aoDeletar,
  variante = "texto"
}: Props) {

  async function deletar() {
    const confirmar = window.confirm(
      "Tem certeza que deseja deletar esta folha de pagamento?"
    )

    if (!confirmar) return

    try {
      await deletarFolhaPagamento(id)
      aoDeletar()
    } catch (error) {
      alert("Erro ao deletar folha de pagamento")
      console.error(error)
    }
  }

  if (variante === "botao") {
    return (
      <button
        onClick={deletar}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-medium transition"
      >
        Deletar
      </button>
    )
  }

  return (
    <button
      onClick={deletar}
      className="text-red-600 hover:underline text-sm"
    >
      Deletar
    </button>
  )
}
