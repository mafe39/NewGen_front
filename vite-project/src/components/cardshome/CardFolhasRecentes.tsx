/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../service/Service";
import { CreditCardIcon } from "@phosphor-icons/react";

interface Colaborador {
  id: number;
  nome: string;
  cargo?: string;
  salario?: number;
}

export function CardFolhasRecentes() {
  const [dados, setDados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoading(true);
        const response = await api.get("/folha-pagamento");

        const lista = Array.isArray(response.data)
          ? response.data
          : response.data?.folhas || [];

        const ultimosCadastrados = [...lista]
          .sort((a, b) => b.id - a.id)
          .slice(0, 6);

        setDados(ultimosCadastrados);
      } catch (error) {
        console.error("Erro ao buscar dados recentes:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  const formatarNome = (item: any) => {
    const col = item.colaboradores || item;
    if (Array.isArray(col)) return col[0]?.nome || "Sem nome";
    return col?.nome || "Sem nome";
  };

  const formatarValor = (item: any) => {
    const valor = item.salarioFinal || item.salario || 0;
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="w-full flex justify-center mt-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden flex flex-col">
        
       
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 font-bold text-lg">
              Folhas Recentes
            </h2>
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Pagamentos processados
            </p>
          </div>
          <div className="text-green-600">
            <CreditCardIcon size={28} weight="duotone" />
          </div>
        </div>

        
        <div className="p-4 flex-grow">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : dados.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              Nenhum registro recente.
            </p>
          ) : (
            <div className="space-y-3">
              {dados.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  <span className="font-semibold text-gray-900 text-sm">
                    {formatarNome(item)}
                  </span>

                  <div className="text-right">
                    <span className="block font-bold text-green-600 text-sm">
                      {formatarValor(item)}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                      Salário Final
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      
        <Link
          to="/folha"
          className="w-full text-center py-4 bg-gray-100 text-black text-sm font-semibold hover:bg-gray-200 hover:font-bold transition-all border-t border-gray-100 mt-auto"
        >
          Ver todos os registros
        </Link>
      </div>
    </div>
  );
}

export default CardFolhasRecentes;
