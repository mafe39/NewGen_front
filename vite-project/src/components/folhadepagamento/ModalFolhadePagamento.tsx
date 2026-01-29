import { useEffect, useState } from "react";
import type { FolhaDePagamento } from "../../models/FolhaDePagamento";
import {
  atualizarFolhaPagamento,
  criarFolhaPagamento,
  listarColaboradores,
  listarFolhasPagamento,
  type Colaborador,
} from "../../service/Service";

interface Props {
  aberto: boolean;
  onFechar: () => void;
  aoSalvar: () => void;
  folha: FolhaDePagamento | null;
}

export default function ModalFolhaDePagamento({
  aberto,
  onFechar,
  aoSalvar,
  folha,
}: Props) {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState("");

  const [totalHoras, setTotalHoras] = useState("");
  const [valorHora, setValorHora] = useState("");
  const [descontos, setDescontos] = useState("");
  const [bonus, setBonus] = useState("");

  const editando = !!folha;

 
  useEffect(() => {
    if (aberto && !editando) {
      Promise.all([listarColaboradores(), listarFolhasPagamento()]).then(
        ([todosColaboradores, folhas]) => {
          const idsComFolha = new Set(folhas.map((f) => f.colaboradores.id));

          const disponiveis = todosColaboradores.filter(
            (c) => c.status === true && !idsComFolha.has(c.id),
          );

          setColaboradores(disponiveis);
        },
      );
    }
  }, [aberto, editando]);

 
  useEffect(() => {
    if (folha) {
      setTotalHoras(String(folha.totalHoras));
      setValorHora(String(folha.valorHora));
      setDescontos(String(folha.descontos));
      setBonus(String(folha.bonus));
    } else {
      setColaboradorSelecionado("");
      setTotalHoras("");
      setValorHora("");
      setDescontos("");
      setBonus("");
    }
  }, [folha, aberto]);

  if (!aberto) return null;

  async function salvar() {
    try {
      if (editando && folha) {
        await atualizarFolhaPagamento({
          id: folha.id,
          totalHoras: Number(totalHoras),
          valorHora: Number(valorHora),
          descontos: Number(descontos),
          bonus: Number(bonus),
        });
      } else {
        if (!colaboradorSelecionado) {
          alert("Selecione um colaborador");
          return;
        }

        await criarFolhaPagamento({
          idColaborador: Number(colaboradorSelecionado),
          totalHoras: Number(totalHoras),
          valorHora: Number(valorHora),
          descontos: Number(descontos),
          bonus: Number(bonus),
        });
      }

      aoSalvar();
      onFechar();
    } catch (err) {
      alert("Erro ao salvar");
      console.error(err);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md border border-emerald-200">
        <h2 className="text-xl font-semibold text-emerald-900 mb-6">
          {editando ? "Editar Folha de Pagamento" : "Nova Folha de Pagamento"}
        </h2>

        <div className="space-y-4">
          {!editando && (
            <div>
              <label className="block text-sm text-emerald-800 mb-1">
                Colaborador
              </label>
              <select
                value={colaboradorSelecionado}
                onChange={(e) => setColaboradorSelecionado(e.target.value)}
                className="w-full border border-emerald-300 p-3 rounded-lg"
              >
                <option value="">Selecione um colaborador</option>
                {colaboradores.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm text-emerald-800 mb-1">
              Total de Horas
            </label>
            <input
              value={totalHoras}
              onChange={(e) => setTotalHoras(e.target.value)}
              className="w-full border border-emerald-300 p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-emerald-800 mb-1">
              Valor da Hora
            </label>
            <input
              value={valorHora}
              onChange={(e) => setValorHora(e.target.value)}
              className="w-full border border-emerald-300 p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-emerald-800 mb-1">
              Descontos
            </label>
            <input
              value={descontos}
              onChange={(e) => setDescontos(e.target.value)}
              className="w-full border border-emerald-300 p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-emerald-800 mb-1">Bônus</label>
            <input
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              className="w-full border border-emerald-300 p-3 rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onFechar}
            className="px-5 py-2 rounded-lg border border-emerald-400 text-emerald-700"
          >
            Cancelar
          </button>

          <button
            onClick={salvar}
            className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            {editando ? "Salvar Alterações" : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
