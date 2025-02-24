'use client'
import React from "react";
import RowComponent from "./RowComponent";
type Props = {
  rows: any[];
};
const ListRowsComponent = ({ rows }: Props) => {
  return (
    <>
      {rows.map((row) => (
        <RowComponent key={row.id} row={row} />
      ))}
    </>
  );
};

export default ListRowsComponent;
