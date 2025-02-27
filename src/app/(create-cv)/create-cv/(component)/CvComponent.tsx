"use client";
import React from "react";

import ListRowsComponent from "./ListRowsComponent";
type Props = {
  layoutInstance: any;
  ref: any;
};
const CvComponent = ({ layoutInstance, ref }: Props) => {
  return (
    <div  className="md:w-[800px] pt-5 mb-8">
      <div ref={ref} className="ml-28 w-full p-3 flex flex-col justify-center bg-white ">
        <ListRowsComponent rows={layoutInstance?.rows} />
      </div>
    </div>
  );
};

export default CvComponent;
