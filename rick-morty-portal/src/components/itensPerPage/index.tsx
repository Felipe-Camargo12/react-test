  "use client";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  

  interface ItensPerPageProps {
    pageSize: number;
    setPageSize: (value: number) => void;
    setCurrentPage: (value: number) => void;
  }

export default function ItensPerPage({ pageSize, setPageSize, setCurrentPage }: ItensPerPageProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-sm font-medium">
        Itens por página:
      </label>
      <Select
        value={String(pageSize)}
        onValueChange={(value) => {
          setPageSize(Number(value));
          setCurrentPage(1); // Volta pra página 1 ao mudar o tamanho da página
        }}
      >
        <SelectTrigger className="w-[100px] border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}