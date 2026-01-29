import { useEffect, useState } from "react";
import { Users } from "@phosphor-icons/react";
import { buscarColaboradores } from "../../service/Service";
import { Link } from "react-router-dom";

function CardColaboradoresHome() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarColaboradores() {
      try {
        setLoading(true);
        const dados = await buscarColaboradores();
        setTotal(dados.length);
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }

    carregarColaboradores();
  }, []);

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      {/* Estrutura idêntica ao CardHorasTrabalhadas */}
      <div className="bg-white rounded-xl shadow-md w-70 overflow-hidden flex flex-col">
        {/* Container de Conteúdo */}
        <div className="p-6 pb-4">
          <div className="w-fit p-3 rounded-lg">
            <Users size={28} className="text-[#2B3D4F]" />
          </div>

          <p className="text-4xl font-bold text-gray-800 mt-4">
            {loading ? "..." : total}
          </p>

          <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wider">
            Colaboradores
          </h2>
        </div>

        {/* Rodapé */}
        <Link
          to="/colaboradores"
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

export default CardColaboradoresHome;
