"use client";
import React from "react";

import ListRowsComponent from "./ListRowsComponent";
type Props = {
  layoutInstance: any;
  ref: any;
};
const CvComponent = ({ layoutInstance, ref }: Props) => {
  return (
    <div className="w-full ml-6 md:ml-28  pt-5 mb-8">
      <div
        ref={ref}
        className="md:scale-[0.5] lg:scale-100 scale-[0.4] origin-top-left w-[800px] p-4 flex flex-col justify-center bg-white"
      >
        <ListRowsComponent rows={layoutInstance?.rows} />
      </div>
    </div>
  );
};

export default CvComponent;
