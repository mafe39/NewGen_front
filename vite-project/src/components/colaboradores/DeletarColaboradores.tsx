import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Colaboradores } from "../../models/Colaboradores";
import { buscar, deletar } from "../../service/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function DeletarColaboradores() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [colaborador, setColaborador] = useState<Colaboradores>(
    {} as Colaboradores,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [confirmar, setConfirmar] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      buscar(`/colaboradores/${id}`, setColaborador);
    }
  }, [id]);

  async function deletarColaborador() {
    try {
      setIsLoading(true);
      await deletar(`/colaboradores/${id}`);
      ToastAlerta("Colaborador excluído com sucesso!", "sucesso");
      retornar();
    } catch {
      ToastAlerta("Erro ao excluir colaborador.", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  function retornar() {
    navigate("/colaboradores");
  }

  return (
    <div className="min-h-screen bg-[#E5FCF5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Excluir colaborador
        </h1>

        {confirmar && (
          <p className="text-sm text-center text-gray-500">
            Tem certeza que deseja excluir este colaborador?
            <br />
            <span className="text-red-500 font-medium">
              Essa ação não poderá ser desfeita.
            </span>
          </p>
        )}

        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <header className="bg-[#B3DEC1] text-gray-800 px-4 py-2 font-medium">
            Dados do colaborador
          </header>

          <div className="p-4 space-y-2 text-sm text-gray-700">
            <p>
              <strong>Nome:</strong> {colaborador.nome}
            </p>
            <p>
              <strong>Cargo:</strong> {colaborador.cargo}
            </p>
            <p>
              <strong>Salário:</strong> R${" "}
              {Number(colaborador.salario).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            className="w-full border border-gray-300 rounded-lg py-2 text-sm
                       text-gray-600 hover:bg-gray-100 transition"
            onClick={retornar}
          >
            Cancelar
          </button>

          {!confirmar ? (
            <button
              className="w-full bg-red-500 text-white rounded-lg py-2 text-sm
                         hover:bg-red-600 transition"
              onClick={() => setConfirmar(true)}
            >
              Excluir
            </button>
          ) : (
            <button
              className="w-full bg-red-600 text-white rounded-lg py-2 text-sm
                         hover:bg-red-700 transition disabled:opacity-50"
              onClick={deletarColaborador}
              disabled={isLoading}
            >
              {isLoading ? "Excluindo..." : "Confirmar exclusão"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeletarColaboradores;
