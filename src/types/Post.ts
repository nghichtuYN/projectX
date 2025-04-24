import { AttachedFile, User } from "./Conversation";

export type Post = {
  id: string;
  content: string;
  isEdited?: boolean;
  edited?: boolean | null;
  user?: User;
  parentPost?: string | null;
  likesCount?: number;
  commentsCount?: number;
  attachedFile?: AttachedFile;
  comments?: Post[] | undefined;
  created?: string;
  liked:boolean |null;
};
export type ListPosts = {
  first: boolean;
  last: boolean;
  items: Post[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

export type PostById = {
  post: Post;
  commentPagination: {
    first: boolean;
    last: boolean;
    totalItems: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
  };
};
