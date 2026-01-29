import axios from "axios"
import type { FolhaDePagamento } from "../models/FolhaDePagamento"

export const api = axios.create({
  baseURL: "http://localhost:3000",
})


export interface Colaborador {
  id: number
  nome: string
}

export async function listarColaboradores(): Promise<Colaborador[]> {
  const response = await api.get("/colaboradores")
  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function buscarColaboradores(): Promise<any[]> {
  const response = await api.get("/colaboradores")
  return response.data
}

export async function listarFolhasPagamento(): Promise<FolhaDePagamento[]> {
  const response = await api.get("/folha-pagamento")
  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function buscarFolhasPagamento(): Promise<any[]> {
  const response = await api.get("/folha-pagamento")
  return response.data
}

export async function criarFolhaPagamento(dados: {
  idColaborador: number
  totalHoras: number
  valorHora: number
  descontos: number
  bonus: number
}) {
  const response = await api.post("/folha-pagamento", {
    totalHoras: dados.totalHoras,
    valorHora: dados.valorHora,
    descontos: dados.descontos,
    bonus: dados.bonus,
    colaboradores: {
      id: dados.idColaborador,
    },
  })

  return response.data
}

export async function atualizarFolhaPagamento(dados: {
  id: number
  totalHoras: number
  valorHora: number
  descontos: number
  bonus: number
}) {
  const response = await api.put("/folha-pagamento", dados)
  return response.data
}

export async function deletarFolhaPagamento(id: number) {
  await api.delete(`/folha-pagamento/${id}`)
}
