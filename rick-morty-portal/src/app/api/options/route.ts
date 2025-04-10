import { fetchOptionsFilters } from "@/services/getOptionsFilters";
import { NextResponse } from "next/server";

export async function GET() {
  // Chama a função assíncrona que busca as opções de filtro especies e tipos
  // retorna tudo em um JSON, fazendo 1 requisição invés de buscar especies e tipos em todas as páginas do lado do client
  const options = await fetchOptionsFilters();
  return NextResponse.json(options);
}
