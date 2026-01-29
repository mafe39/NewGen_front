import CardColaboradoresHome from "../components/cardshome/CardColaboradoresHome";
import CardFolhasRecentes from "../components/cardshome/CardFolhasRecentes";

import CardHorasTrabalhadas from "../components/cardshome/CardHorasTrabalhadas";
import CardTotalFolha from "../components/cardshome/CardTotaldaFolha";
import { CardUltimosColaboradores } from "../components/cardshome/CardUltimosColaboradores";

import { buscarColaboradores } from "../service/Service";
import { useEffect, useState } from "react";

export function Home() {
  const [totalColaboradores, setTotalColaboradores] = useState<number>(0);

  useEffect(() => {
    buscarColaboradores()
      .then(colaboradores => {
        setTotalColaboradores(colaboradores.length);
      })
      .catch(() => setTotalColaboradores(0));
  }, []);

  return (
    <div className="flex-1 w-full bg-[#E5FCF5] font-normal">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-800 mb-1">
            Bem-vindo ao Sistema New-Gen
          </h1>
          <p className="text-gray-600 text-lg font-normal">
            Gerencie seus colaboradores e a folha de pagamento de forma prática e eficiente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CardColaboradoresHome total={totalColaboradores} />
          <CardHorasTrabalhadas />
          <CardTotalFolha colaboradorId={0} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          <CardUltimosColaboradores />
          <CardFolhasRecentes />
        </div>
      </div>
    </div>
  );
}

export default Home;
