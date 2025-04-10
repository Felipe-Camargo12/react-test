"use client";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import CharacterCard from "@/components/cards/index";
import Filters from "@/components/filters";
import { fetchCharacters } from "@/services/getCardsCharacters";
import PaginationFooter from "@/components/paginationFooter";
import ItensPerPage from "@/components/itensPerPage";
import LoadingSkeleton from "@/components/loadingSkeleton";
import { useQueryParamsFilters } from "@/hooks/queryParamsFilters";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense as Suspense3D } from "react";
import { Meeseks } from "@/components/animate/3d-animate";
import { useRef } from "react";

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
    search,
    status,
    species,
    gender,
    type,
    handleSearchChange,
    handleStatusChange,
    handleSpeciesChange,
    handleGenderChange,
    handleTypeChange,
    clearFilters,
    searchParams,
  } = useQueryParamsFilters();

  const [allCharacters, setAllCharacters] = useState<ParamsCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [totalCount, setTotalCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 20
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearchChange(debouncedSearch); // só envia pro filtro depois do tempo
    }, 500); // 500ms de delay

    return () => clearTimeout(timer); // limpa timeout anterior se continuar digitando
  }, [debouncedSearch]);

  useEffect(() => {
    setDebouncedSearch(search);
  }, [search]);

  // Effect para fazer busca de personagens sempre que um filtro ou página mudar
  // Passa a página atual e os filtros na busca
  // Requisição sempre que mudar filtro ou pageSize
  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;

    setCurrentPage(pageParam);
    const apiPage = Math.ceil((pageParam * pageSize) / 20); // Cálculo da página da API

    setLoading(true);
    fetchCharacters(search, status, species, gender, type, apiPage).then((data) => {
        setAllCharacters(data.characters);
        setTotalCount(data.totalCount);
        setLoading(false);

        // Verifica se algum filtro está preenchido
        const hasFilters = search || status || species || gender || type;

        // Verifica se foi um clear
        const isClear = searchParams.get("clear") === "true";

        if (hasFilters || isClear) {
          filtersRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Remove o "clear" da URL após usar
          if (isClear) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("clear");
            window.history.replaceState(null, "", `/?${params.toString()}`);
          }
        }
      }
    );
  }, [searchParams]);

  // Calculo o total de páginas baseado na quantidade de itens
  // Math.ceil serve para arredondar, qualquer sobra vira 1 página
  // garante sobras de itens
  const totalPages = Math.ceil(totalCount / pageSize);

  // Reparte o totalPersonangens pelo tamanho de itens por página
  // Exemplo: Pagina 3 c/ 10 personagens: slice((3 - 1) * 10, 3 * 10) = slice(20, 30)
  // Exemplo: Pagina 2 c/ 5 personagens: slice((2 - 1) * 5, 2 * 5) = slice(5, 10)
  const paginatedCharacters = allCharacters.slice(
    ((currentPage - 1) * pageSize) % 20, // inicio dentro da apiPage
    (((currentPage - 1) * pageSize) % 20) + pageSize // fim dentro da apiPage
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

  // Manter referencia nos filtros para não subir a tela
  const filtersRef = useRef<HTMLDivElement | null>(null);

  return (
    <Suspense>
      <div className="flex flex-col min-h-screen">
        {/* Header*/}
        <Header />

        {/* Apresentação */}
        <main className="flex flex-col items-center sm:items-start justify-center flex-grow p-4 sm:p-20 gap-8 w-full max-w-7xl mx-auto">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-4 py-6">
            {/* Título */}
            <h1
              className="text-3xl md:text-4xl font-black text-center md:text-left w-full md:w-1/3 leading-snug"
              style={{
                color: "#97ce4c", // tom esverdeado vibrante
                textShadow: `
                  -1px -1px #000,
                  1px -1px #000,
                  -1px 1px #000,
                  1px 1px #000
                `,
              }}
            >
              Bem-vindo ao multiverso! <br />
              Encontre seus personagens favoritos aqui
            </h1>

            {/* Canvas com Meeseeks */}
            <div className="w-full md:w-[30rem] h-[400px] md:h-[500px] overflow-visible">
              <Canvas
                className="flex flex-row items-center justify-start bg-cover bg-center"
                camera={{ position: [2, 1.8, 11] }}
                style={{
                  backgroundImage: "url('/portal.png')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <ambientLight intensity={0.9} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <Suspense3D fallback={null}>
                  <Meeseks />
                </Suspense3D>
              </Canvas>
            </div>
          </div>

          <div
            ref={filtersRef}
            className="w-full flex flex-col items-center gap-4"
          >
            {/* Filtros */}
            <Filters
              search={debouncedSearch}
              setSearch={setDebouncedSearch}
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
          </div>

          {/* Listagem */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
            {loading ? (
              <LoadingSkeleton amount={pageSize} />
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
    </Suspense>
  );
}
