import { useState } from "react";
import { cadastrar } from "../../service/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

interface Props {
  fechar: () => void;
  atualizarLista: () => void;
}

function ModalColaboradores({ fechar, atualizarLista }: Props) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cargo: "",
    salario: "",
    status: true,
  });

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    if (!validarColaborador(form)) return;

    try {
      await cadastrar("/colaboradores", form, () => {});
      ToastAlerta("Colaborador cadastrado com sucesso!", "sucesso");
      atualizarLista();
      fechar();
    } catch {
      ToastAlerta("Erro ao cadastrar colaborador.", "erro");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={salvar}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Novo Colaborador
        </h2>

        <input
          name="nome"
          onChange={handleChange}
          placeholder="Nome"
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          name="cargo"
          onChange={handleChange}
          placeholder="Cargo"
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          name="salario"
          onChange={handleChange}
          placeholder="Salário"
          className="w-full border rounded-lg px-4 py-2"
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={fechar}
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

export default ModalColaboradores;
