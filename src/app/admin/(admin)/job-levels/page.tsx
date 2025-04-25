"use client";
import DialogDelete from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/DialogDelete";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import PaginationComponent from "@/components/PaginationComponent";
import SkeletonTableComponent from "@/components/SeketonTable";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { Input } from "@/components/ui/input";
import { useMutationHook } from "@/hooks/useMutationHook";
import { ContractType } from "@/types/ContractType";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { toast } from "sonner";
import DialogAddJobLevel from "./components/DialogAddJobLevel";
import DialogEditJobLevel from "./components/DialogEditJobLevel";
import { deleteLevel } from "@/services/jobLevels";
import { getAllJobLevels } from "@/queries/queries";
import { Skeleton } from "@/components/ui/skeleton";
import JobLevelClient from "./components/JobLevelClient";

const AdminJobLevelsPage = () => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Quản lý chức vụ
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
        <JobLevelClient />
      </Suspense>
    </>
  );
};

export default AdminJobLevelsPage;
