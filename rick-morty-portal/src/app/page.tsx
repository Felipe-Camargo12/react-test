"use client";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import CharacterCard from "@/components/cards/index";
import Filters from "@/components/filters";
import { fetchCharacters } from "@/services/getCardsCharacters";
import PaginationFooter from "@/components/paginationFooter";
import ItensPerPage from "@/components/itensPerPage";
import LoagingSkeleton from "@/components/loadingSkeleton";

type ParamsCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  origin: { name: string };
  image: string;
};

export default function Home() {
  const [allCharacters, setAllCharacters] = useState<ParamsCharacter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20); // 20 tamanho padrão de personagens/pagina da api

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");

  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(allCharacters.length / pageSize);

  // Pega apenas os personagens da página atual com base no tamanho da página
  const paginatedCharacters = allCharacters.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Effect para fazer busca de personagens sempre que um filtro ou página mudar
  // Passa a página atual e os filtros na busca
  // Requisição sempre que mudar filtro ou pageSize
  useEffect(() => {
    setLoading(true);
    fetchCharacters(search, status, species, gender, type).then((data) => {
      setAllCharacters(data);
      setCurrentPage(1); // Reseta pra página 1 sempre que os filtros mudarem
      setLoading(false);
    });
  }, [search, status, species, gender, type]);

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
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          species={species}
          setSpecies={setSpecies}
          gender={gender}
          setGender={setGender}
          type={type}
          setType={setType}
        />

        {/* Seleção de itens por página */}
        <ItensPerPage
          pageSize={pageSize}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
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
          setCurrentPage={setCurrentPage} // Passa função para atualizar a página
          totalPages={totalPages} //Total de páginas
        />
      </main>
    </div>
  );
}
