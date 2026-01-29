import { useEffect, useState } from "react";
import { buscarColaboradores } from "../../service/Service";
import { UserCirclePlus } from "@phosphor-icons/react";

interface Colaborador {
  id: number;
  nome: string;
  cargo: string;
  fotoUrl?: string;
}

export function CardUltimosColaboradores() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarColaboradores() {
      try {
        setLoading(true);
        const data = await buscarColaboradores();
        
        const ultimos = [...data].slice(-6).reverse();
        setColaboradores(ultimos);
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarColaboradores();
  }, []);

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden">
  
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 font-bold text-lg">Últimos Colaboradores</h2>
            <p className="text-gray-500 text-xs uppercase tracking-wider">Recém admitidos</p>
          </div>
          <div className="text-green-900">
             <UserCirclePlus size={28} weight="duotone" />
          </div>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : colaboradores.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Nenhum colaborador encontrado.</p>
          ) : (
            <div className="space-y-3">
              {colaboradores.map((c, index) => (
                <div 
                  key={c.id || index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  <div className="flex items-center gap-3">
              
                    <div className="h-10 w-10 rounded-full bg-green-950 flex items-center justify-center text-gray-300 font-bold text-xs shrink-0">
                      {c.nome.substring(0, 2).toUpperCase()}
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 text-sm">
                        {c.nome}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="block font-medium text-gray-700 text-sm">
                      {c.cargo}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                      Cargo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          className="w-full py-4 bg-gray-100 text-black text-sm font-semibold hover:bg-gray-200 hover:font-bold transition-all border-t border-gray-100"
          onClick={() => window.alert("Navegar para listagem de colaboradores")}
        >
          Ver todos os colaboradores
        </button>
      </div>
    </div>
  );
}

export default CardUltimosColaboradores;