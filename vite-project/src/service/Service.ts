import type { FolhaDePagamento } from "../models/FolhaDePagamento"

const BASE = "http://localhost:3000"

const FOLHA_URL = `${BASE}/folha-pagamento`
const COLAB_URL = `${BASE}/colaboradores`


export async function listarFolhasPagamento(): Promise<FolhaDePagamento[]> {
  const response = await fetch(FOLHA_URL)

  if (!response.ok) {
    throw new Error("Erro ao buscar folhas de pagamento")
  }

  return response.json()
}

export async function criarFolhaPagamento(dados: {
  idColaborador: number
  totalHoras: number
  valorHora: number
  descontos: number
  bonus: number
}) {
  const response = await fetch("http://localhost:3000/folha-pagamento", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      totalHoras: dados.totalHoras,
      valorHora: dados.valorHora,
      descontos: dados.descontos,
      bonus: dados.bonus,
      colaboradores: {
        id: dados.idColaborador,
      },
    }),
  })

  if (!response.ok) {
    throw new Error("Erro ao criar folha de pagamento")
  }

  return response.json()
}


export async function atualizarFolhaPagamento(dados: {
  id: number
  totalHoras: number
  valorHora: number
  descontos: number
  bonus: number
}) {
  const response = await fetch(FOLHA_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  })

  if (!response.ok) {
    throw new Error("Erro ao atualizar folha de pagamento")
  }

  return response.json()
}

export async function deletarFolhaPagamento(id: number) {
  const response = await fetch(`${FOLHA_URL}/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Erro ao deletar folha de pagamento")
  }
}


export interface Colaborador {
  id: number
  nome: string
}

export async function listarColaboradores(): Promise<Colaborador[]> {
  const response = await fetch(COLAB_URL)

  if (!response.ok) {
    throw new Error("Erro ao buscar colaboradores")
  }

  return response.json()
}
