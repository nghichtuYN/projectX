import {
  getConversation,
  getConversationById,
} from "./../services/conversation";
import { useQueryHook } from "@/hooks/useQueryHook";
import { getBusiness, getFreelance } from "@/services/admin";
import { getApplicationByJobId, getAppliedJobs } from "@/services/application";
import { getAppointmentById, getAppointments } from "@/services/appointment";
import { getBusinessInfo } from "@/services/business";
import {
  getAllCampaigns,
  getAppLicationByCampaignId,
  getDetailsCampaign,
  getJobByCampaignId,
} from "@/services/campaign";
import {
  getACompany,
  getCompanies,
  getRating,
  getSelf,
} from "@/services/company";
import { getContractType, getContractTypeById } from "@/services/contractType";
import { getFreelanceRecruitment } from "@/services/freelance";
import { getLevelById, getLevels } from "@/services/jobLevels";
import { getJobById, getJobs, getJobSaved } from "@/services/jobs";
import { getJobTypeById, getJobTypes } from "@/services/jobTypes";
import { getMajor, getMajorById } from "@/services/majors";
import { getPost, getPostById } from "@/services/posts";
import { getSkillById, getSkills } from "@/services/skills";
import { getUserCon } from "@/services/user";
import {
  ApllicationList,
  AplliedJobList,
  AppliedJob,
} from "@/types/Apllication";
import { AppointmentDetail, ListAppointment } from "@/types/Appointment";
import {
  BusinessVerification,
  ListBusinessVerification,
} from "@/types/BusinessVerification";
import { campaignType, ListCampaign } from "@/types/campaign";
import {
  CompanyPublic,
  CompanyPublicList,
  CompanyVerifed,
  RatingsList,
} from "@/types/Company";
import { ContractType, ListContractTypes } from "@/types/ContractType";
import { Conversation, ListConversations, User } from "@/types/Conversation";
import { FreelanceUser, ListFreeLaneRecruiter } from "@/types/Freelance";
import { JobLevel } from "@/types/JobLevelType";
import {
  FreelanceRecruiter,
  Job,
  JobPublic,
  ListJob,
  ListJobPublic,
} from "@/types/Jobs";
import { JobType, ListJobType } from "@/types/JobType";
import { ListMajors, Major } from "@/types/majors";
import { ListPosts, Post, PostById } from "@/types/Post";
import { ListJobSaved } from "@/types/SavedJob";
import { ListSkills, Skills } from "@/types/skills";
import { QueryKey } from "@tanstack/react-query";
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
    () => getMajor(search, pageSize, page)
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
export const getApplyByCampain = (
  id: string,
  search: string,
  page: number,
  seen: string,
  process?: string
) => {
  return useQueryHook<ApllicationList>(
    ["applications", id, search, page, seen, process],
    () => getAppLicationByCampaignId(id, search, page, seen, process)
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
export const getJobPublicByID = (id: string) => {
  return useQueryHook<JobPublic>(["job", id], () => getJobById(id));
};
export const getJobsQuery = (
  search: string = "",
  pageSize: number = 10,
  locations?: string[],
  majors?: string[],
  companyName?: string | null,
  jobLevels?: string[],
  minSalary?: number | string | undefined,
  maxSalary?: number | string | undefined,
  contractTypes?: string[],
  jobTypes?: string[],
  minExp?: number | string | undefined,
  maxExp?: number | string | undefined,
  options?: any
) => {
  // Create a query key that includes all parameters to ensure cache uniqueness
  const queryKey: QueryKey = [
    "jobs",
    search,
    jobLevels,
    jobTypes,
    contractTypes,
    majors,
    locations,
    minSalary,
    maxSalary,
    pageSize,
    companyName,
    minExp,
    maxExp,
  ];

  return useQueryHook<ListJobPublic>(
    queryKey,
    () =>
      getJobs(
        search,
        companyName,
        jobLevels,
        jobTypes,
        contractTypes,
        majors,
        locations,
        minSalary,
        maxSalary,
        minExp,
        maxExp,
        pageSize
      ),
    options
  );
};
export const getSavedJob = (search: string, page: number) => {
  return useQueryHook<ListJobSaved>(["savedJobs", search, page], () =>
    getJobSaved(search, page)
  );
};

// Admin
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
export const getFreelanceVerified = (
  search: string,
  page: number,
  verified: string
) => {
  return useQueryHook<ListFreeLaneRecruiter>(
    ["freelance_verified", search, page, verified],
    () => getFreelance(search, page, verified === "all" ? undefined : verified)
  );
};
// Bussiness
export const getBusinessInfomation = () => {
  return useQueryHook<BusinessVerification>(["businessInfo"], getBusinessInfo);
};
// conversation
export const getAllConversation = (search: string, page: number) => {
  return useQueryHook<ListConversations>(["conversation", search, page], () =>
    getConversation(search, page)
  );
};
export const getAConversation = (id: string) => {
  return useQueryHook<Conversation>(["conversation", id], () =>
    getConversationById(id)
  );
};
// user
export const getAllConversationUser = (search: string, open: boolean) => {
  return useQueryHook<User[]>(
    ["conversation", search],
    () => getUserCon(search),
    { enabled: !!open }
  );
};
// Posts
export const getAllPost = (search: string, pageSize: number) => {
  return useQueryHook<ListPosts>(["posts", search, pageSize], () =>
    getPost(search, pageSize)
  );
};
export const getAPost = (id: string) => {
  return useQueryHook<PostById>(["post", id], () => getPostById(id));
};
export const getAplliedJob = (search: string, page: number) => {
  return useQueryHook<AplliedJobList>(["appliedJobs", search], () =>
    getAppliedJobs(search, page)
  );
};
// application
export const getApllicatinByJobID = (
  id: string,
  search: string,
  page: number,
  seen: string,
  process?: string
) => {
  return useQueryHook<AplliedJobList>(
    ["appliedJobs", id, search, page, seen, process],
    () => getApplicationByJobId(id, search, page, seen, process)
  );
};
export const getAFreelance = () => {
  return useQueryHook<FreelanceUser>(["freelance"], () =>
    getFreelanceRecruitment()
  );
};
// companies
export const getAllCompany = (
  search: string,
  pageSize: number,
  page: number
) => {
  return useQueryHook<CompanyPublicList>(
    ["companies", search, page, pageSize],
    () => getCompanies(search, page, pageSize)
  );
};
export const getDetailCompany = (id: string) => {
  try {
    return useQueryHook<CompanyPublic>(["company", id], () => getACompany(id));
  } catch (error) {
    throw error;
  }
};
export const getRatings = (
  id: string,
  page: number,
  pageSize: number,
  sort?: string
) => {
  return useQueryHook<RatingsList>(
    ["ratings", id, page, pageSize, sort],
    () => {
      return getRating(id, page, pageSize, sort);
    }
  );
};
export const getCompany = () => {
  return useQueryHook<CompanyVerifed>(["company"], () => getSelf());
};
//
export const getAppointment = (
  search: string,
  page: number,
  thisWeek: string,
  pageSize: number
) => {
  return useQueryHook<ListAppointment>(
    ["appointments", search, page, thisWeek, pageSize],
    () => {
      return getAppointments(search, page, thisWeek, pageSize);
    }
  );
};
export const getDetailAppointment = (id: string) => {
  return useQueryHook<AppointmentDetail>(["appointment", id], () =>
    getAppointmentById(id)
  );
};
