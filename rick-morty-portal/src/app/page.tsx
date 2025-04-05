import HomeWrapper from "@/components/homeWrapper/index";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <HomeWrapper />
    </Suspense>
  );
}
