"use client";
import React from "react";
import ListColumnsComponent from "./ListColumnsComponent";
type Props = {
  row: any;
};
const RowComponent = ({ row }: Props) => {
  return (
    <div className="rounded-lg h-fit min-h-28 w-full mb-1 gap-1 flex items-start">
      <ListColumnsComponent columns={row?.columns} />
    </div>
  );
};

export default RowComponent;
