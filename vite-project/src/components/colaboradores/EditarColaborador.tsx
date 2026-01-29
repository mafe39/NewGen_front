import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, atualizar } from "../../service/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import type { Colaboradores } from "../../models/Colaboradores";

function EditarColaborador() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [colaborador, setColaborador] = useState<Colaboradores>(
    {} as Colaboradores,
  );

  useEffect(() => {
    if (id) {
      buscar(`/colaboradores/${id}`, setColaborador);
    }
  }, [id]);

  function atualizarEstado(e: any) {
    setColaborador({
      ...colaborador,
      [e.target.name]:
        e.target.name === "status" ? e.target.value === "true" : e.target.value,
    });
  }

  function validarColaborador(dados: any): boolean {
    if (!dados.nome || !dados.email || !dados.cargo || !dados.salario) {
      ToastAlerta("Preencha todos os campos obrigatórios.", "erro");
      return false;
    }

    if (!dados.email.includes("@")) {
      ToastAlerta("Email inválido. Verifique o formato.", "erro");
      return false;
    }

    if (Number(dados.salario) <= 0) {
      ToastAlerta("Salário deve ser maior que zero.", "erro");
      return false;
    }

    return true;
  }

  async function salvar(e: any) {
    e.preventDefault();

    if (!validarColaborador(colaborador)) return;

    try {
      await atualizar("/colaboradores", colaborador, setColaborador);
      ToastAlerta("Colaborador atualizado com sucesso!", "sucesso");
      navigate("/colaboradores");
    } catch {
      ToastAlerta("Erro ao atualizar colaborador.", "erro");
    }
  }

  return (
    <div className="min-h-screen bg-[#E5FCF5] flex items-center justify-center px-4">
      <form
        onSubmit={salvar}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">
          Editar Colaborador
        </h1>

        <input
          name="nome"
          value={colaborador.nome || ""}
          onChange={atualizarEstado}
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          name="email"
          value={colaborador.email || ""}
          onChange={atualizarEstado}
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          name="cargo"
          value={colaborador.cargo || ""}
          onChange={atualizarEstado}
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          name="salario"
          value={colaborador.salario || ""}
          onChange={atualizarEstado}
          className="w-full border rounded-lg px-4 py-2"
        />

        <select
          name="status"
          value={String(colaborador.status)}
          onChange={atualizarEstado}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/colaboradores")}
            className="px-4 py-2 border rounded-lg"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-[#B3DEC1] rounded-lg font-medium"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarColaborador;
