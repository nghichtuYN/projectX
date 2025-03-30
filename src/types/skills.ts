export type Skills = {
  id: string;
  name: string;
  description: string;
};
export type ListSkills = {
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  items: Skills[];
};
