import { RevenuePage } from "@/components";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <RevenuePage />
    </Suspense>
  );
}
