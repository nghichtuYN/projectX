"use client";
import React from "react";
import { Input } from "../../../../components/ui/input";
import EditLayoutComponent from "./EditLayoutComponent";
type Props = {
  handleChangeColor: (newColor: string) => void;
  color: string;
  setLayoutInstance: (layout: any) => void;
};

const ToolbarCvComponent = ({
  handleChangeColor,
  color,
  setLayoutInstance,
}: Props) => {
  return (
    <div className="px-4 bg-white py-3 rounded-tl-md rounded-tr-md flex justify-center items-center gap-5 w-full flex-wrap border-t-2 ">
      <div className="flex justify-end items-center w-full gap-2 lg:w-10/12 flex-wrap ">
        <div className="w-fit flex items-center flex-wrap gap-2 bg-white   border-r-2 ">
          <div className="pl-2">Màu chủ đề</div>
          <Input
            type="color"
            onInput={(event) => {
              const target = event.target as HTMLInputElement;
              handleChangeColor(target.value);
            }}
            value={color}
            data-testid="setColor"
            className="w-12 border-none  focus-visible:ring-0 placeholder:font-medium rounded-3xl"
          />
        </div>
        <EditLayoutComponent setLayoutInstance={setLayoutInstance} />
      </div>
    </div>
  );
};

export default ToolbarCvComponent;
