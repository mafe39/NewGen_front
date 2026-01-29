import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buscarColaboradores = async (): Promise<any[]> => {
  const response = await api.get("/colaboradores");
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buscarFolhasPagamento = async (): Promise<any[]> => {
  const response = await api.get("/folha-pagamento");
  return response.data;
};


