export interface Colaborador {
  id: number
  nome?: string
}

export interface FolhaDePagamento {
  id: number
  totalHoras: number
  valorHora: number
  descontos: number
  bonus: number
  salarioFinal: number
  colaboradores: Colaborador
}
