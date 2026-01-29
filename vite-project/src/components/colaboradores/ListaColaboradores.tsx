import { useEffect, useState } from "react";
import { buscar } from "../../api/apiService";
import CardColaboradores from "./CardColaboradores";
import ModalColaboradores from "./ModalColaboradores";
import type { Colaboradores } from "../../models/Colaboradores";

function ListaColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaboradores[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [statusFiltro, setStatusFiltro] = useState("todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    buscarColaboradores();
  }, []);

  async function buscarColaboradores() {
    try {
      setIsLoading(true);
      await buscar("/colaboradores", setColaboradores);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  const colaboradoresFiltrados = colaboradores.filter((c) => {
    const nomeMatch = c.nome.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      statusFiltro === "todos" ||
      (statusFiltro === "ativo" && c.status === true) ||
      (statusFiltro === "inativo" && c.status === false);

    return nomeMatch && statusMatch;
  });

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-12">
          Gerenciar Colaboradores
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#B3DEC1] px-4 py-2 rounded-lg font-medium hover:opacity-90"
          >
            + Novo Colaborador
          </button>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Buscar colaborador"
              className="w-64 px-4 py-2 border rounded-lg text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Status:</span>
              <select
                className="border rounded-lg px-2 py-1 text-sm"
                value={statusFiltro}
                onChange={(e) => setStatusFiltro(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-3 bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Últimos Colaboradores
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#DCEFE6] text-gray-700">
                <tr>
                  <th className="text-left px-4 py-3">Nome</th>
                  <th className="text-left px-4 py-3">Cargo</th>
                  <th className="text-left px-4 py-3">Salário</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-center px-4 py-3">Ações</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {colaboradoresFiltrados.map((colaborador) => (
                  <CardColaboradores
                    key={colaborador.id}
                    colaborador={colaborador}
                  />
                ))}
              </tbody>

              <tfoot className="bg-[#DCEFE6]">
                <tr>
                  <td colSpan={5} className="px-4 py-3 text-xs text-gray-500">
                    Exibindo {colaboradoresFiltrados.length} colaboradores
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {colaboradoresFiltrados.length === 0 && (
            <p className="text-center text-sm text-gray-500 mt-6">
              Nenhum colaborador encontrado.
            </p>
          )}
        </div>
      </div>

      {openModal && (
        <ModalColaboradores
          fechar={() => setOpenModal(false)}
          atualizarLista={buscarColaboradores}
        />
      )}
    </>
  );
}

export default ListaColaboradores;
