import { Heart } from "lucide-react";
import { Container } from "@/components/container/index";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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

  return (
    <Container>
      {/* Grid de Cards*/}
      <section
        className="relative border rounded-lg shadow-lg cursor-pointer mb-6"
        onClick={handleOpenModal}
      >
        {/* Botão favoritar*/}
        <button className="absolute top-2 right-2 bg-white p-2 rounded-full hover:bg-gray-200 z-10">
          <Heart size={24} color="red" />
        </button>
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-t-md"
        />

        {/* Text Content */}
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-11/12 sm:w-1/2 dark:bg-gray-800">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">{character.name}</h2>
            <p className="text-xl font-semibold mb-2 dark:text-gray-300">
              Espécie: {character.species}
            </p>
            <p className="text-xl font-semibold mb-2 dark:text-gray-300">
              Status: {character.status}
            </p>
            <p className="text-xl font-semibold mb-2 dark:text-gray-300">
              Gênero: {character.origin.name}
            </p>
            <img
              src={character.image}
              alt={character.name}
              className="rounded-md object-cover mb-4"
            />
            <div className="mt-4 text-center">
              <Button variant="destructive" onClick={handleCloseModal}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
