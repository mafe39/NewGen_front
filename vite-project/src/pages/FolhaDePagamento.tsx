import CardFolhaDePagamento from "../componentes/folhadepagamento/CardFolhaDePagamento"
import ListarFolhaDePagamento from "../componentes/folhadepagamento/ListarFolhaDePagamento"

export default function FolhaPagamento() {
  return (
    <div className="min-h-screen bg-[#E5FCF5] py-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Folha de Pagamento
          </h1>
          <p className="text-gray-500 mt-1">
            Gerencie os pagamentos dos colaboradores
          </p>
        </div>

        <CardFolhaDePagamento />

        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <ListarFolhaDePagamento />
          </div>
        </div>

      </div>
    </div>
  )
}
