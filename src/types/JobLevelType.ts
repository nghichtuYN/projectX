export type JobLevel = {
  id: string;
  name: string;
};
export type ListJobLevel = {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  items: JobLevel[];
};
