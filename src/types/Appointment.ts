import { AppliedJob, Appointment } from "./Apllication";

export type ListAppointment = {
  items: Appointment[];
  totalItems: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  pageNumber: number;
  pageSize: number;
};
export type AppointmentDetail = Appointment & {
  application: AppliedJob;
};
