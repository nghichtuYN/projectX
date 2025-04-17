import { Company } from "./Company";

export type BusinessVerification = {
  companyId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  company: Company;
  businessVerified: boolean;
};
export type ListBusinessVerification = {
  items: BusinessVerification[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
};
