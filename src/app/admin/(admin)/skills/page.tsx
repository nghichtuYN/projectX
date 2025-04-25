"use client";
import DialogDelete from "@/app/(employer)/employer/recruitment-campaigns/[id]/(components)/DialogDelete";
import TableComponent, { TableColumn } from "@/components/TableComponent";
import { useMutationHook } from "@/hooks/useMutationHook";
import { getAllSkills } from "@/queries/queries";
import { deleteSkill } from "@/services/skills";
import { Skills } from "@/types/skills";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { toast } from "sonner";
import DialogEditSkill from "./components/DialogEditSkill";
import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import { Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SkeletonTableComponent from "@/components/SeketonTable";
import PaginationComponent from "@/components/PaginationComponent";
import DialogAddSkill from "./components/DialogAddSkill";
import { Skeleton } from "@/components/ui/skeleton";
import AdminSkillClient from "./components/SkillClient";

const AdminSkillsPage = () => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">
            Quản lý kỹ năng
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
        <AdminSkillClient />
      </Suspense>
    </>
  );
};

export default AdminSkillsPage;
