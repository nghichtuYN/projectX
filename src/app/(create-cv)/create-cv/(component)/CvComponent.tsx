"use client";
import React from "react";

import ListRowsComponent from "./ListRowsComponent";
type Props = {
  layoutInstance: any;
};
const CvComponent = ({ layoutInstance }: Props) => {
  return (
    <div className="md:w-[795px] pt-3 mb-8">
      <div className="ml-28 w-full p-3 flex flex-col justify-center bg-white ">
        <ListRowsComponent rows={layoutInstance?.rows} />
      </div>
    </div>
  );
};

export default CvComponent;
