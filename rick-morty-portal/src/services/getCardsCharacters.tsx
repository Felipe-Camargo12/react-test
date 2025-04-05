// Request assíncrona para busca de personangens feita de forma separada em "services"
export async function fetchCharacters(
  search: string,
  status: string,
  species: string,
  gender: string,
  type: string,
) {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_URL_API}/character`;
    let currentPage = 1;
    let allCharacters = [];
    // Variavel para saber se ainda existem páginas a serem buscadas
    let hasNext = true;

    // Enquanto houver proxima página continua buscando
    while (hasNext) {
      const url = new URL(baseUrl);
      // Atualiza a requisição p/ pagina atual
      url.searchParams.append("page", currentPage.toString());
      // Aplica os filtros apenas se tiverem valor definido
      if (search) url.searchParams.append("name", search);
      if (status) url.searchParams.append("status", status);
      if (species) url.searchParams.append("species", species);
      if (gender) url.searchParams.append("gender", gender);
      if (type) url.searchParams.append("type", type);

      const response = await fetch(url.toString());
      const data = await response.json();
      
      //Adiciona resultados ao array
      if (data.results) {
        allCharacters.push(...data.results);
      }

      // Verifica se existe uma proxima pagina
      if (data.info?.next) {
        currentPage++; // Iterra para ir pra proxima página
      } else {
        hasNext = false; // Encerra o while setando false
      }
    }

    return allCharacters;
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    return [];
  }
}
