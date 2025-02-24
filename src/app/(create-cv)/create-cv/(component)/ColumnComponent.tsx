"use client";
import React from "react";
import ListContentsComponent from "./ListContentsComponent";
type Props = {
  column: any;
};

const ColumnComponent = ({ column }: Props) => {
  return (
    <div className="h-full" style={{ width: `${column?.width}%` }}>
      <ListContentsComponent contents={column.content} />
    </div>
  );
};

export default ColumnComponent;
