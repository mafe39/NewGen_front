import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TimerIcon } from "@phosphor-icons/react";
import { buscarFolhasPagamento } from "../../service/Service";

export function CardHorasTrabalhadas() {
  const [horas, setHoras] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarHoras() {
      try {
        setLoading(true);
        const folhas = await buscarFolhasPagamento();
        const totalHoras = folhas.reduce(
          (acc: number, folha: any) => acc + Number(folha.totalHoras || 0),
          0
        );
        setHoras(totalHoras);
      } catch (error) {
        console.error("Erro ao calcular horas trabalhadas:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarHoras();
  }, []);

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <div className="bg-white rounded-xl shadow-md w-70 overflow-hidden flex flex-col">
        
    
        <div className="p-6 pb-4">
          <div className="w-fit p-3 rounded-lg">
            <TimerIcon size={28} className="text-[#2B3D4F]" />
          </div>

          <p className="text-4xl font-bold text-gray-800 mt-4">
            {loading ? "..." : horas ?? 0}
          </p>

          <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wider">
            Horas trabalhadas
          </h2>
        </div>

        
        <Link
          to="/colaboradores"
          className="mt-auto bg-gray-100 px-6 py-4 text-sm text-gray-700 flex justify-end hover:bg-gray-200 transition-all border-t border-gray-100 hover:font-bold"
        > Ver todos →
          <span className="font-medium hover:font-bold transition-all text-black">
            
            
          </span>
        </Link>
      </div>
    </div>
  );
}

export default CardHorasTrabalhadas;
