"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function useQueryParamsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    // Atualiza os valores sempre que os searchParams mudarem
    setSearch(searchParams.get("name") || "");
    setStatus(searchParams.get("status") || "");
    setSpecies(searchParams.get("species") || "");
    setGender(searchParams.get("gender") || "");
    setType(searchParams.get("type") || "");
  }, [searchParams]);
  
  const clearFilters = () => {
    const params = new URLSearchParams();
    params.set("clear", "true"); // Marca que foi uma limpeza
  
    // Atualiza a URL e força disparo do useEffect
    router.push(`/?${params.toString()}`);
  
    // Limpa os filtros no estado local
    setSearch("");
    setStatus("");
    setSpecies("");
    setGender("");
    setType("");
  };
  
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
