import { ColumnType } from "./Columns";

export type RowType = {
  id: string;
  width?: string;
  columns: ColumnType[];
};
