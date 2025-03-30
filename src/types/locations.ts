export type Location = {
  id: string;
  name: string;
  region: number;
};
export type ListLocations = {
  items: Location[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
};
