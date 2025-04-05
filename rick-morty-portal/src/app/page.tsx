"use client";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import CharacterCard from "@/components/cards/index";
import Filters from "@/components/filters";
import { fetchCharacters } from "@/services/getCardsCharacters";
import PaginationFooter from "@/components/paginationFooter";
import ItensPerPage from "@/components/itensPerPage";
import LoagingSkeleton from "@/components/loadingSkeleton";
import { useQueryParamsFilters } from "@/hooks/queryParamsFilters";

type ParamsCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  origin: { name: string };
  image: string;
};

export default function Home() {
  const {
    search, status, species, gender, type,
    handleSearchChange, handleStatusChange,
    handleSpeciesChange, handleGenderChange,
    handleTypeChange, clearFilters, searchParams
  } = useQueryParamsFilters();

  const [allCharacters, setAllCharacters] = useState<ParamsCharacter[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(Number(searchParams.get("pageSize")) || 20);

  // Effect para fazer busca de personagens sempre que um filtro ou página mudar
  // Passa a página atual e os filtros na busca
  // Requisição sempre que mudar filtro ou pageSize
  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;
    setCurrentPage(pageParam);
  }, [searchParams]);
  useEffect(() => {
    setLoading(true);
    fetchCharacters(search, status, species, gender, type).then((data) => {
      setAllCharacters(data);
      setLoading(false);
    });
  }, [searchParams]);

  // Calculo o total de páginas baseado na quantidade de itens
  // Math.ceil serve para arredondar, qualquer sobra vira 1 página
  // garante sobras de itens
  const totalPages = Math.ceil(allCharacters.length / pageSize);

  // Reparte o totalPersonangens pelo tamanho de itens por página
  // Exemplo: Pagina 3 c/ 10 personagens: slice((3 - 1) * 10, 3 * 10) = slice(20, 30)
  // Exemplo: Pagina 2 c/ 5 personagens: slice((2 - 1) * 5, 2 * 5) = slice(5, 10)
  const paginatedCharacters = allCharacters.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Atualiza a page atual
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    window.history.pushState(null, "", `/?${params.toString()}`); // Atualiza a URL sem recarregar a página
  };

  // Atualiza o tamanho de itens p/ page
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", String(size));
    params.set("page", "1"); // Volta para a primeira página sempre que o tamanho muda
    window.history.pushState(null, "", `/?${params.toString()}`); // Atualiza a URL sem recarregar a página
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header*/}
      <Header />

      {/* Apresentação */}
      <main className="flex flex-col items-center sm:items-start justify-center flex-grow p-4 sm:p-20 gap-8 w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center sm:text-left">
          Rick and Morty Characters
        </h1>

        {/* Filtros */}
        <Filters
          search={search}
          setSearch={handleSearchChange}
          status={status}
          setStatus={handleStatusChange}
          species={species}
          setSpecies={handleSpeciesChange}
          gender={gender}
          setGender={handleGenderChange}
          type={type}
          setType={handleTypeChange}
          clearFilters={clearFilters}
        />

        {/* Seleção de itens por página */}
        <ItensPerPage
          pageSize={pageSize}
          setPageSize={handlePageSizeChange}
          setCurrentPage={handlePageChange}
        />

        {/* Listagem */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
          {loading ? (
            <LoagingSkeleton amount={pageSize} />
          ) : paginatedCharacters.length > 0 ? (
            paginatedCharacters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              Nenhum personagem encontrado.
            </p>
          )}
        </div>

        {/* Componente de paginação */}
        <PaginationFooter
          currentPage={currentPage} //Página atual
          setCurrentPage={handlePageChange} // Passa função para atualizar a página
          totalPages={totalPages} //Total de páginas
        />
      </main>
    </div>
  );
}
