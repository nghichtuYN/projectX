export type campaignType = {
  id: string;
  close: Date;
  countJobs: number;
  description: string;
  name: string;
  open: Date;
  status: number;
};
export type ListCampaign = {
  first: boolean;
  last: boolean;
  items: campaignType[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};
