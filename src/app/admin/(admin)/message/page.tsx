import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import MessageClient from "./components/MessageClient";

const MessagePage = () => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">Liên hệ</p>
        </div>
      </EmployerSidebaHeaderComponent>

      <Suspense
        fallback={
          <div className="pt-14 pl-8 pr-8 w-full">
            <div className="container w-full mx-auto p-4 space-y-4 bg-accent">
              <Skeleton className="h-10 w-[300px]" />
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        }
      >
        <MessageClient />
      </Suspense>
    </>
  );
};

export default MessagePage;
