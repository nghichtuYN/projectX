export type FreelanceRecruiter = {
  id: string;
  status: number;
  rejectReason: string;
  frontIdCard: FrontIdCard;
  backIdCard: BackIdCard;
};
export type FrontIdCard = {
  id: string;
  name: string;
  path: string;
};
export type BackIdCard = {
  id: string;
  name: string;
  path: string;
};
export type FreelanceUser = {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  gitHubProfile: string;
  linkedInProfile: string;
  freelanceRecruiter: FreelanceRecruiter;
  freelanceRecruiterVerified: boolean;
};
export type ListFreeLaneRecruiter = {
  first: boolean;
  last: boolean;
  items: FreelanceUser[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};
