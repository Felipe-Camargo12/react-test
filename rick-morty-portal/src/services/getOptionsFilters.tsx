// Request para a api feita de forma separada em "services"
// Função assíncrona para buscar opções que irão aparecer nos inputs selects de filtragem
// Foi usado somente para especies e tipos, porque os outros filtros são menores e já estão descritos na documentação da api pública
export async function fetchOptionsFilters() {

    const allSpecies = new Set<string>();
    const allTypes = new Set<string>();
    // Define que a busca começa na "page 1"
    let nextPage = `${process.env.NEXT_PUBLIC_URL_API}/character?page=1`;
  
    try {
      // Loop para continuar buscando dados enquanto tiver mais página
      while (nextPage) {
        const res = await fetch(nextPage);
        const data = await res.json();
  
        // Itera sobre a lista, e adiciona espécies e tipos aos conjuntos 
        data.results.forEach((character) => {
          allSpecies.add(character.species);
          if (character.type) allTypes.add(character.type);
        });
  
        nextPage = data.info.next; // Próxima página
      }
  
      return {
        species: Array.from(allSpecies), // Converte Set para Array
        types: Array.from(allTypes), // Converte Set para Array
      };
    } catch (error) {
      console.error("Erro ao buscar filtros:", error);
      return { species: [], types: [] };
    }
  }
  