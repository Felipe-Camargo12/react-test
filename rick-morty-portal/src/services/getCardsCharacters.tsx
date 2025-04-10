// Request assíncrona para busca de personangens feita de forma separada em "services"
export async function fetchCharacters(
  search: string,
  status: string,
  species: string,
  gender: string,
  type: string,
  apiPage: number
) {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_URL_API}/character`;
    const url = new URL(baseUrl);

    // Define a página e aplica filtros (caso existam)
    url.searchParams.append("page", apiPage.toString());
    if (search) url.searchParams.append("name", search);
    if (status) url.searchParams.append("status", status);
    if (species) url.searchParams.append("species", species);
    if (gender) url.searchParams.append("gender", gender);
    if (type) url.searchParams.append("type", type);

    const response = await fetch(url.toString());
    const data = await response.json();

    // Retorna tanto os personagens quanto o total de itens encontrados
    return {
      characters: data.results || [],
      totalCount: data.info?.count || 0,
    };
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    return {
      characters: [],
      totalCount: 0,
    };
  }
}