import { User } from "./Conversation";
import {  JobPublic } from "./Jobs";

export type Resume = {
  id: string;
  name: string;
  path: string;
  uploaded: string;
};

export type Apllication = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  introduction: string;
  status: number;
  process: number;
  submitted: string;
  applied: string;
  resume: Resume;
  jobId:string
  modified: string;
  appointment: Appointment | null;
};
export type ApllicationList = {
  items: Apllication[];
  totalItems: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  pageNumber: number;
  pageSize: number;
};
export type AppliedJob = Apllication & {
  job: JobPublic;
};
export type AplliedJobList = {
  items: AppliedJob[];
  totalItems: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  pageNumber: number;
  pageSize: number;
};
export type Appointment = {
  id: string;
  startTime: string;
  endTime: string;
  participant: User;
  note: string;
  created: string;
};
