import HomeWrapper from "@/components/homeWrapper/index";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <HomeWrapper />
    </Suspense>
  );
}
