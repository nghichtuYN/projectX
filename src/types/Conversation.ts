import { StaticImageData } from "next/image";

export type Conversation = {
  id: string;
  isGroup: boolean;
  groupName: string;
  groupPicture?: string;
  isStored?: true;
  latestMessage?: string;
  latestMessageDetails?: Message;
  participant?: User;
  messages?:Message[]
};
export type Message = {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    profilePicture: string;
  };
  isRead: boolean;
  read: string;
  isEdited: boolean;
  edited: string;
  attachedFile: AttachedFile;
  created: string;
};
export type AttachedFile = {
  id: string;
  name: string;
  path: string;
  uploaded: string;
};
export type ListConversations = {
  first: boolean;
  last: boolean;
  items: Conversation[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};
export type User = {
  id: string;
  name: string;
  profilePicture: string;
};
