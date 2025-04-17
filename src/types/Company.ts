import { Location } from "./locations";
import { Major } from "./majors";
import { RegistrationFile } from "./RegistrationFile";

export type Company = {
  id: string;
  companyName: string;
  shortName: string;
  taxCode: string;
  headQuarterAddress: string;
  logo: string;
  contactEmail: string;
  foundedYear: number;
  contactPhone: string;
  size: number;
  introduction: string;
  website: string;
  location: Location;
  status: number;
  rejectReason: string | null;
  majors: Major[];
  registrationFile: RegistrationFile;
};
