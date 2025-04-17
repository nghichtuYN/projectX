import { useQueryHook } from "@/hooks/useQueryHook";
import { getBusiness } from "@/services/business";
import {
  getAllCampaigns,
  getDetailsCampaign,
  getJobByCampaignId,
} from "@/services/campaign";
import { getContractType, getContractTypeById } from "@/services/contractType";
import { getLevelById, getLevels } from "@/services/jobLevels";
import { getJobById } from "@/services/jobs";
import { getJobTypeById, getJobTypes } from "@/services/jobTypes";
import { getMajor, getMajorById } from "@/services/majors";
import { getSkillById, getSkills } from "@/services/skills";
import { ListBusinessVerification } from "@/types/BusinessVerification";
import { campaignType, ListCampaign } from "@/types/campaign";
import { ContractType, ListContractTypes } from "@/types/ContractType";
import { JobLevel } from "@/types/JobLevelType";
import { Job, ListJob } from "@/types/Jobs";
import { JobType, ListJobType } from "@/types/JobType";
import { ListMajors, Major } from "@/types/majors";
import { ListSkills, Skills } from "@/types/skills";
//JobTypes
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
export const getDetailJobType = (id: string, open: boolean) => {
  return useQueryHook<JobType>(["jobType", id], () => getJobTypeById(id), {
    enabled: !!id && open,
  });
};
//JobLevels
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
export const getDetailJobLevel = (id: string, open: boolean) => {
  return useQueryHook<JobLevel>(["jobLevels", id], () => getLevelById(id), {
    enabled: !!id && open,
  });
};
// Skills
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
export const getDetailSkill = (id: string, open: boolean) => {
  return useQueryHook<Skills>(["skill", id], () => getSkillById(id), {
    enabled: !!id && open,
  });
};
// ContractType
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
export const getDetailContractType = (id: string, open: boolean) => {
  return useQueryHook<ContractType>(
    ["contract_type", id],
    () => getContractTypeById(id),
    { enabled: !!id && open }
  );
};
// Majors
export const getAllMajors = (
  search: string,
  pageSize?: number,
  page?: number,
  open?: boolean
) => {
  return useQueryHook<ListMajors>(
    [
      "majors",
      {
        search,
        pageSize,
        page,
      },
    ],
    () => getMajor(search, pageSize, page),
    { enabled: !!open }
  );
};
export const getDetailMajors = (id: string, open: boolean) => {
  return useQueryHook<Major>(["major", id], () => getMajorById(id), {
    enabled: !!id && open,
  });
};
// Campaigns
export const getCampaigns = (
  search: string,
  page: number,
  pageSize?: number,
  open?: boolean
) => {
  return useQueryHook<ListCampaign>(["campaigns", search, page], () =>
    getAllCampaigns(search, page)
  );
};
export const getDetailCampaigns = (id: string) => {
  return useQueryHook<campaignType>(
    ["campaign", id],
    () => getDetailsCampaign(id),
    { enabled: !!id }
  );
};

// Jobs
export const getJobsByCampaignId = (
  id: string,
  search: string,
  page: number
) => {
  return useQueryHook<ListJob>(
    ["jobs", search, page, id],
    () => getJobByCampaignId(id, search, page),
    { keepPreviousData: true, staleTime: 1000 }
  );
};
export const getJobByID = (id: string) => {
  return useQueryHook<Job>(["job", id], () => getJobById(id));
};
// Business Verified
export const getBusinessVerified = (
  search: string,
  page: number,
  verified: string
) => {
  return useQueryHook<ListBusinessVerification>(
    ["business_verified", search, page, verified],
    () => getBusiness(search, page, verified === "all" ? undefined : verified)
  );
};
