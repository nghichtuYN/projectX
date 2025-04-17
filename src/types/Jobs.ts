import { ContractType } from "./ContractType";
import { JobLevel } from "./JobLevelType";
import { JobType } from "./JobType";
import { Location } from "./locations";
import { Major } from "./majors";
import { Skills } from "./skills";

export type Job = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  officeAddress: string;
  status: number;
  educationLevelRequire: number;
  yearOfExperience: number;
  minSalary: number;
  maxSalary: number;
  isHighlight: boolean;
  highlightStart: Date | null;
  highlightEnd: Date | null;
  countApplications: number;
  major: Major;
  location: Location;
  jobDescription: string | null;
  skills: Skills[];
  contractTypes: ContractType[];
  jobLevels: JobLevel[];
  jobTypes: JobType[];
};
export type ListJob = {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  items: Job[];
};
