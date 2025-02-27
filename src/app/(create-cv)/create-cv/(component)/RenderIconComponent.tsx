import React from "react";
import {
  Award,
  BriefcaseBusiness,
  FileBadge,
  FolderGit2,
  GraduationCap,
  Hand,
  Hash,
  IdCard,
  Info,
  Pen,
  SquareUserRound,
  Target,
  ThumbsUp,
  UserPlus,
} from "lucide-react";
import { ComponentType } from "./RenderComponent";

// Định nghĩa kiểu cho các key hợp lệ

const ListComponentCV: Record<
  ComponentType,
  React.ComponentType<{ size?: number }>
> = {
  info: Info,
  achievement: Award,
  activies: Hand,
  avatar: SquareUserRound,
  business_card: IdCard,
  career_goals: Target,
  certificate: FileBadge,
  educations: GraduationCap,
  experiencies: BriefcaseBusiness,
  hobbies: ThumbsUp,
  referencer: UserPlus,
  skills: Pen,
  projects: FolderGit2,
  info_bonus: Hash,
};

type Props = {
  keyName: ComponentType;
};

const RenderIconComponent: React.FC<Props> = ({ keyName }) => {
  const Component = ListComponentCV[keyName] || Info;
  return <Component size={20} />;
};

export default RenderIconComponent;
