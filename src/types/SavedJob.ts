import { User } from "./Conversation";
import { Location } from "./locations";

export type SavedJob = {
  id: string;
  title: string;
  minSalary: number;
  maxSalary: number;
  yearOfExperience: number;
  location: Location;
  recruiter: User;
  created: string;
};
export type ListJobSaved = {
  items: SavedJob[];
  totalItems: number;
  totalPages: number;
  first: true;
  last: true;
  pageNumber: number;
  pageSize: number;
};
