export type ContractType = {
    id: string;
    name: string;
  };
  export type ListContractTypes = {
    totalItems: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    first: boolean;
    last: boolean;
    items: ContractType[];
  };
  