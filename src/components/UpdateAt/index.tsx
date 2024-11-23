"use client";

import { Status } from "@/types";
import useSWR from "swr";

async function fetchAPI(arg: string) {
  const response = await fetch(arg);
  const responseBody: Status = await response.json();
  return responseBody;
}

export default function UpdateAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading || !data) {
    return <h4>Carregando...</h4>;
  }

  return (
    <div>
      <p>
        Última atualização: {new Date(data.updated_at).toLocaleString("pt-BR")}
      </p>
      <h2>Banco de dados</h2>
      <p>Versão do banco de dados: {data.dependencies.database.version}</p>
      <p>Conexões ativas: {data.dependencies.database.opened_connections}</p>
      <p>Máximo de conexões: {data.dependencies.database.max_connections}</p>
    </div>
  );
}
