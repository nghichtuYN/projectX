import { useQueryHook } from "@/hooks/useQueryHook";
import { getContractType } from "@/services/contractType";
import { getLevels } from "@/services/jobLevels";
import { getJobTypes } from "@/services/jobTypes";
import { getSkills } from "@/services/skills";
import { ListContractTypes } from "@/types/ContractType";
import { ListJobType } from "@/types/JobType";
import { ListSkills } from "@/types/skills";

export const getAllJobTypes = (
  search: string,
  pageSize?: number,
  page?: number,
  open?: boolean
) => {
  return useQueryHook<ListJobType>(
    [
      "jobTypes",
      {
        search,
        pageSize,
        page,
      },
    ],
    () => getJobTypes(search, pageSize, page),
    { enabled: !!open }
  );
};
export const getAllJobLevels = (
  search: string,
  pageSize?: number,
  page?: number,
  open?: boolean
) => {
  return useQueryHook<ListJobType>(
    [
      "jobLevels",
      {
        search,
        pageSize,
        page,
      },
    ],
    () => getLevels(search, pageSize, page),
    { enabled: !!open }
  );
};
export const getAllSkills = (
  search: string,
  pageSize?: number,
  page?: number,
  open?: boolean
) => {
  return useQueryHook<ListSkills>(
    [
      "skills",
      {
        search,
        pageSize,
        page,
      },
    ],
    () => getSkills(search, pageSize, page),
    { enabled: !!open }
  );
};
export const getAllContractType = (
  search: string,
  pageSize?: number,
  page?: number,
  open?: boolean
) => {
  return useQueryHook<ListContractTypes>(
    [
      "contract_type",
      {
        search,
        pageSize,
        page,
      },
    ],
    () => getContractType(search, pageSize, page),
    { enabled: !!open }
  );
};
