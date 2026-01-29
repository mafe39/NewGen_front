import { useEffect, useState } from "react";

interface Colaborador {
  id: number;
  nome: string;
  cargo: string;
  email: string;
  salarioBase: number;
}

interface FolhaPagamento {
  salarioBruto: number;
  descontos: number;
  salarioLiquido: number;
}

export default function Colaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] =
    useState<Colaborador | null>(null);
  const [folha, setFolha] = useState<FolhaPagamento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/colaboradores")
      .then((res) => res.json())
      .then((data) => setColaboradores(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  function selecionarColaborador(colaborador: Colaborador) {
    setColaboradorSelecionado(colaborador);

    fetch(`http://localhost:8080/folha/${colaborador.id}`)
      .then((res) => res.json())
      .then((data) => setFolha(data))
      .catch((err) => console.error(err));
  }

  if (loading) return <p>Carregando colaboradores...</p>;

  return (
<div className="min-h-screen bg-[#E5FCF5] pt-24 pb-10 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">
          Colaboradores & Folha de Pagamento
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          <div>
            <h2 className="text-xl font-semibold mb-4">Colaboradores</h2>

            <ul className="space-y-3">
              {colaboradores.map((colaborador) => (
                <li
                  key={colaborador.id}
                  onClick={() => selecionarColaborador(colaborador)}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-[#E5FCF5] transition"
                >
                  <p className="font-semibold">{colaborador.nome}</p>
                  <p className="text-sm text-gray-600">
                    {colaborador.cargo}
                  </p>
                </li>
              ))}
            </ul>
          </div>

         
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Detalhes da Folha
            </h2>

            {!colaboradorSelecionado && (
              <p className="text-gray-500">
                Selecione um colaborador para visualizar a folha.
              </p>
            )}

            {colaboradorSelecionado && folha && (
              <div className="space-y-3">
                <p>
                  <strong>Nome:</strong> {colaboradorSelecionado.nome}
                </p>
                <p>
                  <strong>Cargo:</strong> {colaboradorSelecionado.cargo}
                </p>
                <p>
                  <strong>Salário Bruto:</strong> R$ {folha.salarioBruto}
                </p>
                <p>
                  <strong>Descontos:</strong> R$ {folha.descontos}
                </p>
                <p className="text-lg font-bold">
                  Salário Líquido: R$ {folha.salarioLiquido}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
