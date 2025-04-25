// src/app/(routes)/page.tsx
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HomeClient from "./(components)/HomeClient";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-4">
          <Skeleton className="h-8 w-[200px] mb-4" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      }
    >
      <HomeClient />
    </Suspense>
  );
}