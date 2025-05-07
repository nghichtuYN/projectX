import { BussinessPackage } from "./BussinessPackage";

export type OrderTopUp = {
  id: string;
  amountCash: number;
  gateway: number;
  amountToken: number;
  created: string;
  modified: string;
};
export type ServiceOrder = {
  id: string;
  type: 0 | 1 | 2;
  isActive: boolean;
  created: string;
  modified: string;
};
export type OrderJobs = {
  id: string;
  amountCash: number;
  gateway: number;
  services: ServiceOrder[];
  created: string;
  modified: string;
};
export type OrderBusiness = {
  id: string;
  amount: number;
  gateway: number;
  purchasedPackage: {
    id: string;
    businessPackage: BussinessPackage;
    isActive: boolean;
    startDate: string;
    endDate: string;
    created: string;
    modified: string;
  };
  created: string;
  modified: string;
};
