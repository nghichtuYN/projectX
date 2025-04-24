'use client'
import InfomationComponent from "./(dragComponent}/Infomation/InfomationComponent";
import AchievementComponent from "./(dragComponent}/Achievements/AchievementComponent";
import ActiviesComponent from "./(dragComponent}/Activies/ActiviesComponent";
import BusinessCard from "./(dragComponent}/BusinessCardComponent";
import CareerGoalsComponent from "./(dragComponent}/CareerGoalsComponent";
import CertificateComponent from "./(dragComponent}/Certificates/CertificatesComponent";
import ExperienciesComponent from "./(dragComponent}/Experiencies/ExperienciesComponent";
import HobbiesComponent from "./(dragComponent}/HobbiesComponent";
import ReferencerComponent from "./(dragComponent}/Referencers/ReferencerComponent";
import SkillComponent from "./(dragComponent}/Skills/SkillComponent";
import { FormType } from "@/types/formCvtype";
import EducationComponent from "./(dragComponent}/Educations/EducationsComponent";
import AvatarDragComponent from "./(dragComponent}/AvatarComponent/AvatarDragComponent";
import ProjectsComponent from "./(dragComponent}/Projects/ProjectsComponent";
import MoreInfosComponent from "./(dragComponent}/MoreInfos/MoreInfosComponent";
export type ComponentType =
  | "info"
  | "achievement"
  | "activies"
  | "avatar"
  | "business_card"
  | "career_goals"
  | "certificate"
  | "educations"
  | "experiencies"
  | "hobbies"
  | "referencer"
  | "skills"
  | "projects"
  | "info_bonus";
type ComponentProps = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const componentMap: Record<ComponentType, React.FC<ComponentProps>> = {
  info: InfomationComponent,
  achievement: AchievementComponent,
  activies: ActiviesComponent,
  avatar: AvatarDragComponent,
  business_card: BusinessCard,
  career_goals: CareerGoalsComponent,
  certificate: CertificateComponent,
  educations: EducationComponent,
  experiencies: ExperienciesComponent,
  hobbies: HobbiesComponent,
  referencer: ReferencerComponent,
  skills: SkillComponent,
  projects: ProjectsComponent,
  info_bonus: MoreInfosComponent,
};

type RenderComponentProps = {
  type?: string;
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};

export const RenderComponent: React.FC<RenderComponentProps> = ({
  type,
  handleChange,
}) => {
  const Component = componentMap[type as ComponentType] || null;
  return <Component handleChange={handleChange} />;
};
