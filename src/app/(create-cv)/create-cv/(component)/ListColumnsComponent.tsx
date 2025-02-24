'use client'
import React from "react";
import ColumnComponent from "./ColumnComponent";

type Props = {
  columns: any[];
};
const ListColumnsComponent = ({ columns }: Props) => {
  return (
    <>
      {columns?.map((column) => (
        <ColumnComponent key={column.id} column={column} />
      ))}
    </>
  );
};

export default ListColumnsComponent;
