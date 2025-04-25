import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ForumClient from "./components/ForumClient";

export const dynamic = "force-dynamic";

export default function ForumPage() {
  return (
    <div className="bg-[#1e1e2f] grid grid-cols-1 place-items-center">
      <Suspense
        fallback={
          <div className="container w-2/5 min-h-screen my-8">
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-[600px] w-full" />
          </div>
        }
      >
        <ForumClient />
      </Suspense>
    </div>
  );
}
