import { ComponentType } from "@/app/(create-cv)/create-cv/(component)/RenderComponent";

export type ContentType = {
  id: string;
  column_id: string;
  name: string;
  FE_PlaceholderContent?: boolean;
  type?: ComponentType;
  required?: boolean;
};
