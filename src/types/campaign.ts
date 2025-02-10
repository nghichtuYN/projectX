export type Campaign = {
  id: string;
  name: string;
  status: string;
  active: boolean;
  progress: number;
  postStatus: string;
  systemCV?: {
    status: string;
    isActive: boolean;
  };
  actions?: {
    canEdit: boolean;
    canDelete: boolean;
    canViewReport: boolean;
  };
};
