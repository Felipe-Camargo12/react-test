import { Heart, ExternalLink, X } from "lucide-react";
import { Container } from "@/components/container/index";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  origin: { name: string };
  image: string;
};

// Estados para abrir o card clicado em um modal com os detalhes do personagem
export default function CharacterCard({ character }: { character: Character }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Função para abrir imagem em nova guia
  const handleOpenImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(character.image);
  };

  return (
    <Container>
      {/* Grid de Cards*/}
      <section
        className="relative border rounded-lg shadow-lg cursor-pointer mb-6"
        onClick={handleOpenModal}
      >
        {/* Botão favoritar*/}
        <Button className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-200">
          <Heart color="red" />
        </Button>
        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-t-md"
        />

        {/* Botão de abrir imagem em nova aba */}
        <Button
          className="absolute top-2 right-12 bg-white p-2 rounded-full hover:bg-gray-200 "
          onClick={handleOpenImage}
          title="Abrir imagem em nova aba"
        >
          <ExternalLink color="black" />
        </Button>

        {/* Conteudo de texto */}
        <div className="p-4 flex flex-col justify-between h-[40%]">
          {/* Nome do personagem c/ truncate se for longo */}
          <h2 className="text-lg font-bold truncate overflow-hidden whitespace-nowrap">
            {character.name}
          </h2>
          <p className="text-sm text-gray-600">Status: {character.status}</p>
        </div>
      </section>

      {/* Modal com detalhes */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative">
            {/* Botão de fechar flutuante */}
            <Button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 rounded-full"
              variant="destructive"
            >
              <X/>
            </Button>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Imagem */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <Image
                  src={character.image}
                  alt={character.name}
                  width={300}
                  height={300}
                  className="rounded-xl object-cover shadow-lg"
                />
              </div>

              {/* Informações do personagem */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-lime-600 dark:text-lime-400 text-center rick-and-morty-font">
                  {character.name}
                </h2>

                <div className="space-y-3">
                  {Object.entries(character).map(([key, value]) => {
                    if (
                      key === "image" ||
                      key === "id" ||
                      key === "name" ||
                      key === "url" ||
                      key === "created" ||
                      Array.isArray(value)
                    )
                      return null;

                    if (typeof value === "object" && value !== null) {
                      return (
                        <div key={key}>
                          <p className="text-sm font-semibold text-lime-600 dark:text-lime-400 capitalize rick-and-morty-font">
                            {key}:
                          </p>
                          {Object.entries(value).map(([subKey, subValue]) => {
                            if (subKey === "url") return null;
                            return (
                              <p
                                key={subKey}
                                className="text-sm text-zinc-800 dark:text-zinc-100 ml-2"
                              >
                                {subKey}:{" "}
                                <span className="font-medium">
                                  {subValue || "Unknown"}
                                </span>
                              </p>
                            );
                          })}
                        </div>
                      );
                    }

                    return (
                      <p
                        key={key}
                        className="text-sm text-zinc-800 dark:text-zinc-100"
                      >
                        <span className="font-semibold capitalize text-lime-600 dark:text-lime-400 rick-and-morty-font">
                          {key}:
                        </span>{" "}
                        {value?.toString() || "Unknown"}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
