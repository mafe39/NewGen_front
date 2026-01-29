import type { Colaboradores } from "../../models/Colaboradores";
import { Link } from "react-router-dom";

interface Props {
  colaborador: Colaboradores;
}

function CardColaboradores({ colaborador }: Props) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="px-4 py-3 font-medium text-gray-800">
        {colaborador.nome}
      </td>

      <td className="px-4 py-3 text-gray-600">{colaborador.cargo}</td>

      <td className="px-4 py-3 text-gray-600">
        R$ {Number(colaborador.salario).toFixed(2)}
      </td>

      <td className="px-4 py-3">
        <span
          className={`flex items-center gap-2 ${
            colaborador.status ? "text-green-600" : "text-gray-400"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              colaborador.status ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          {colaborador.status ? "Ativo" : "Inativo"}
        </span>
      </td>

      <td className="px-4 py-3 text-center">
        <div className="flex justify-center gap-3 text-sm">
          <Link
            to={`/editarcolaborador/${colaborador.id}`}
            className="text-blue-600 hover:underline"
          >
            Editar
          </Link>

          <Link
            to={`/deletarcolaborador/${colaborador.id}`}
            className="text-red-500 hover:underline"
          >
            Excluir
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default CardColaboradores;
