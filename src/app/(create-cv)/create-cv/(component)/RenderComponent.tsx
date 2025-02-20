import EmailComponent from "./(dragComponent}/Infomation/EmailComponent";
import PhoneComponent from "./(dragComponent}/Infomation/PhoneComponent";
import InfomationComponent from "./(dragComponent}/Infomation/InfomationComponent";
import AchievementComponent from "./(dragComponent}/AchievementComponent";
import ActiviesComponent from "./(dragComponent}/ActiviesComponent";
import AvatarDragComponent from "./(dragComponent}/AvatarDragComponent";
import BusinessCard from "./(dragComponent}/BusinessCardComponent";
import CareerGoalsComponent from "./(dragComponent}/CareerGoalsComponent";
import CertificateComponent from "./(dragComponent}/CertificateComponent";
import EducationComponent from "./(dragComponent}/EducationComponent";
import ExperienciesComponent from "./(dragComponent}/ExperienciesComponent";
import HobbiesComponent from "./(dragComponent}/HobbiesComponent";
import ReferencerComponent from "./(dragComponent}/ReferencerComponent";
import SkillComponent from "./(dragComponent}/SkillComponent";
type ComponentType =
  | "info"
  | "achievement"
  | "activies"
  | "avatar"
  | "business_card"
  | "career_goals"
  | "certificate"
  | "education"
  | "experiencies"
  | "hobbies"
  | "referencer"
  | "skills";
type ComponentProps = {
  handleChange: (field: string, value: string) => void;
};
const componentMap: Record<ComponentType, React.FC<ComponentProps>> = {
  info: InfomationComponent,
  achievement: AchievementComponent,
  activies: ActiviesComponent,
  avatar: AvatarDragComponent,
  business_card: BusinessCard,
  career_goals: CareerGoalsComponent,
  certificate: CertificateComponent,
  education: EducationComponent,
  experiencies: ExperienciesComponent,
  hobbies: HobbiesComponent,
  referencer: ReferencerComponent,
  skills: SkillComponent,
};

// Component hiển thị dựa vào key
type RenderComponentProps = {
  type: string;
  handleChange: (field: string, value: string) => void;
};

export const RenderComponent: React.FC<RenderComponentProps> = ({
  type,
  handleChange,
}) => {
  const Component = componentMap[type as ComponentType] || null;
  return <Component handleChange={handleChange} />;
};
