export type Major = {
    id: string;
    name: string;
  };
  export type ListMajors = {
    totalItems: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    first: boolean;
    last: boolean;
    items: Major[];
  };
  