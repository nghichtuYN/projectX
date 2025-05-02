import { User } from "./Conversation";
import { Location } from "./locations";
import { Major } from "./majors";
import { RegistrationFile } from "./RegistrationFile";

export type Company = {
  id: string;
  companyName: string;
  shortName: string;
  taxCode: string;
  headQuarterAddress: string;
  logo: string;
  contactEmail: string;
  foundedYear: number;
  contactPhone: string;
  size: number;
  introduction: string;
  website: string;
  location: Location;
  status: number;
  rejectReason: string | null;
  majors: Major[];
  registrationFile: RegistrationFile;
};

export type CompanyPublic = Company & {
  isPro: boolean;
  avgRatings: number;
  cover: string;
};
export type CompanyPublicList = {
  first: boolean;
  last: boolean;
  items: CompanyPublic[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};
export type Review = {
  id: string;
  candidate: User;
  comment: string;
  point: number;
  isAnonymous: boolean;
  created: string;
};
export type RatingsList = {
  first: boolean;
  last: boolean;
  items: Review[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};
export type CompanyVerifed = Omit<
  Company,
  "registrationFile" | "rejectReason"
> & {
  cover: string;
  isPro: boolean;
  avgRatings: number;
};
