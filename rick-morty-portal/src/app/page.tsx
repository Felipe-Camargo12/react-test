import HomeWrapper from "@/components/homeWrapper";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <HomeWrapper />
    </Suspense>
  );
}
