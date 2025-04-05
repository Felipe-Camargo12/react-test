"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchOptionsFilters } from "@/services/getOptionsFilters";

type FiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  species: string;
  setSpecies: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  clearFilters: () => void;
};

export default function Filters({
  search,
  setSearch,
  status,
  setStatus,
  species,
  setSpecies,
  gender,
  setGender,
  type,
  setType,
  clearFilters,
}: FiltersProps) {
  const [speciesList, setSpeciesList] = useState<string[]>([]);
  const [typeList, setTypeList] = useState<string[]>([]);

  useEffect(() => {
    // Chama o services que percorre as informações da API para pegar as opções de filtro
    async function loadFilters() {
      const { species, types } = await fetchOptionsFilters();
      setSpeciesList(species);
      setTypeList(types);
    }

    loadFilters();
  }, []);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-4">
      {/* Filtro por nome */}
      <Input
        type="text"
        placeholder="Buscar personagem por nome"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          textOverflow: 'ellipsis', // Adiciona "..." quando input estiver pequeno
        }}
      />

      {/* Filtro por Status */}
      <Select onValueChange={setStatus} value={status || ""}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="alive">alive</SelectItem>
            <SelectItem value="dead">dead</SelectItem>
            <SelectItem value="unknown">unknown</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Filtro por Gênero */}
      <Select onValueChange={setGender} value={gender || ""}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Gênero" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="male">male</SelectItem>
            <SelectItem value="female">female</SelectItem>
            <SelectItem value="genderless">genderless</SelectItem>
            <SelectItem value="unknown">unknown</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Filtro por Espécie */}
      <Select onValueChange={setSpecies} value={species || ""}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Espécie" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Espécies</SelectLabel>
            {speciesList.length > 0 ? (
              speciesList.map((species) => (
                <SelectItem key={species} value={species.toLowerCase()}>
                  {species}
                </SelectItem>
              ))
            ) : null}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Filtro por Tipo */}
      <Select onValueChange={setType} value={type || ""}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipos</SelectLabel>
            {typeList.length > 0 ? (
              typeList.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))
            ) : null}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Botão para limpar filtros */}
      <Button
        variant="destructive"
        onClick={clearFilters}
      >
        <X size={16} />
        Clear
      </Button>
    </div>
  );
}
