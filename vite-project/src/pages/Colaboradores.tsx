import ListaColaboradores from "../componentes/colaboradores/ListaColaboradores";

function Colaboradores() {
  return (
    <div className="min-h-screen bg-[#E5FCF5] flex justify-center py-10">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-8">
        <ListaColaboradores />
      </div>
    </div>
  );
}

export default Colaboradores;
