"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function useQueryParamsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Função para pegar o parâmetro da URL senão retorna vazio
  const getParam = (param: string) => searchParams.get(param) || "";

  const [search, setSearch] = useState(getParam("name"));
  const [status, setStatus] = useState(getParam("status"));
  const [species, setSpecies] = useState(getParam("species"));
  const [gender, setGender] = useState(getParam("gender"));
  const [type, setType] = useState(getParam("type"));

  useEffect(() => {
    setSearch(getParam("name"));
    setStatus(getParam("status"));
    setSpecies(getParam("species"));
    setGender(getParam("gender"));
    setType(getParam("type"));
  }, [searchParams]);

  // Atualiza a URL com os parametros
  const updateQueryParams = (params: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === "") {
        newParams.delete(key); // Deleta a query se estiver vazio
      } else {
        newParams.set(key, String(value));
      }
    });

    // Adiciona os parametros as rotas
    router.push(`/?${newParams.toString()}`);
  };

  // Qualquer mudança nestes filtros, leva pra page1
  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateQueryParams({ name: value, page: 1 });
  };
  const handleStatusChange = (value: string) => {
    setStatus(value);
    updateQueryParams({ status: value, page: 1 });
  };
  const handleSpeciesChange = (value: string) => {
    setSpecies(value);
    updateQueryParams({ species: value, page: 1 });
  };
  const handleGenderChange = (value: string) => {
    setGender(value);
    updateQueryParams({ gender: value, page: 1 });
  };
  const handleTypeChange = (value: string) => {
    setType(value);
    updateQueryParams({ type: value, page: 1 });
  };

  // Serve para limpar os filtros, e zerar a rota
  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setSpecies("");
    setGender("");
    setType("");
    router.push("/");
  };

  return {
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
  };
}
