export type JobType = {
    id: string;
    name: string;
  };
  export type ListJobType = {
    totalItems: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    first: boolean;
    last: boolean;
    items: JobType[];
  };
  