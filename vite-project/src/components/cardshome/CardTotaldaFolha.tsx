import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoneyWavyIcon } from "@phosphor-icons/react";
import { api } from "../../service/Service";

interface Props {
  colaboradorId: number;
}

function CardTotalFolha({ colaboradorId }: Props) {
  const [totalFolha, setTotalFolha] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarFolha() {
      try {
        setLoading(true);
        const response = await api.get(
          `/folha-pagamento/colaborador/${colaboradorId}`
        );
        const folhas = response.data;

        const soma = folhas.reduce(
          (acc: number, item: any) => acc + (item.salarioFinal ?? 0),
          0
        );
        setTotalFolha(soma);
      } catch (error) {
        console.error("Erro ao buscar folhas de pagamento:", error);
        setTotalFolha(0);
      } finally {
        setLoading(false);
      }
    }

    if (colaboradorId) carregarFolha();
  }, [colaboradorId]);

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <div className="bg-white rounded-xl shadow-md w-70 overflow-hidden flex flex-col">
        
        
        <div className="p-6 pb-4 text-left">
          <div className="w-fit p-3 rounded-lg">
            <MoneyWavyIcon size={28} className="text-[#2B3D4F]" />
          </div>

          <p className="text-4xl font-bold text-gray-800 mt-4 leading-none">
            {loading
              ? "..."
              : totalFolha?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
          </p>

          <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wider mt-2">
            Total da folha
          </h2>
        </div>

        
        <Link
          to="/folha"
          className="mt-auto bg-gray-100 px-6 py-4 text-sm text-gray-700 flex justify-end hover:bg-gray-200 transition-all border-t border-gray-100"
        >
          <span className="font-medium hover:font-bold transition-all text-black">
            Ver todos →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default CardTotalFolha;
