// loadingSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function LoagingSkeleton({ amount = 8 }) {
  return (
    <>
      {Array.from({ length: amount }).map((_, i) => (
        <div
          key={i}
          className="border rounded-lg shadow-lg overflow-hidden mb-6 m-3"
        >
          {/* Simula imagem do personagem */}
          <Skeleton className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-t-md" />

          {/* Simula o conteúdo textual */}
          <div className="p-4 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
}
