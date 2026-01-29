import axios from "axios";
import type { FolhaDePagamento } from "../models/FolhaDePagamento";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});


export interface Colaborador {
  id: number;
  nome: string;
  cargo?: string;
  email?: string;
}


export const buscar = async <T>(
  url: string,
  setDados: (dados: T) => void,
  header: object = {}
) => {
  const resposta = await api.get<T>(url, header);
  setDados(resposta.data);
};

export const cadastrar = async <T>(
  url: string,
  dados: object,
  setDados?: (dados: T) => void,
  header: object = {}
) => {
  const resposta = await api.post<T>(url, dados, header);
  if (setDados) setDados(resposta.data);
  return resposta.data;
};

export const atualizar = async <T>(
  url: string,
  dados: object,
  setDados?: (dados: T) => void,
  header: object = {}
) => {
  const resposta = await api.put<T>(url, dados, header);
  if (setDados) setDados(resposta.data);
  return resposta.data;
};

export const deletar = async (
  url: string,
  header: object = {}
) => {
  await api.delete(url, header);
};


export async function listarColaboradores(): Promise<Colaborador[]> {
  const response = await api.get<Colaborador[]>("/colaboradores");
  return response.data;
}


export async function listarFolhasPagamento(): Promise<FolhaDePagamento[]> {
  const response = await api.get<FolhaDePagamento[]>("/folha-pagamento");
  return response.data;
}

export async function criarFolhaPagamento(dados: {
  idColaborador: number;
  totalHoras: number;
  valorHora: number;
  descontos: number;
  bonus: number;
}) {
  const response = await api.post("/folha-pagamento", {
    totalHoras: dados.totalHoras,
    valorHora: dados.valorHora,
    descontos: dados.descontos,
    bonus: dados.bonus,
    colaboradores: {
      id: dados.idColaborador,
    },
  });

  return response.data;
}

export async function atualizarFolhaPagamento(dados: {
  id: number;
  totalHoras: number;
  valorHora: number;
  descontos: number;
  bonus: number;
}) {
  const response = await api.put("/folha-pagamento", dados);
  return response.data;
}

export async function deletarFolhaPagamento(id: number) {
  await api.delete(`/folha-pagamento/${id}`);
}


export async function buscarColaboradores() {
  return listarColaboradores();
}

export async function buscarFolhasPagamento() {
  return listarFolhasPagamento();
}
