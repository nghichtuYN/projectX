import { ContentType } from "./content";

export type ColumnType = {
  id: string;
  row_id: string;
  width: string;
  content: ContentType[];
};
