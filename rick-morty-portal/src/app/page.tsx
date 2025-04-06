import dynamic from "next/dynamic";
import HomeWrapper from "@/components/homeWrapper";
import Header from "@/components/header";
import { Suspense } from "react";

// Importa Presentation de forma dinâmica sem SSR (evita reinstanciar o canvas)
const Presentation = dynamic(() => import("@/components/presentation"), {
  ssr: false,
  loading: () => <div style={{ height: "500px" }}>Carregando animação...</div>,
});

export default function Page() {
  return (
    <Suspense>
      <HomeWrapper />
    </Suspense>
  );
}
