import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import AppointmentClient from "./components/AppointmentClient";

const AppointmentPage = () => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center">
          <p className="text-lg font-semibold text-secondaryColor">
            Danh sách lịch hẹn
          </p>
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
        <AppointmentClient />
      </Suspense>
    </>
  );
};

export default AppointmentPage;
