"use client";

import { Suspense } from "react";
import FindJobsClient from "./components/FindJobsClient";
import { Skeleton } from "@/components/ui/skeleton";

const FindJobPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex flex-col items-center min-h-screen bg-accent">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        }
      >
        <FindJobsClient />
      </Suspense>
    </>
  );
};

export default FindJobPage;
