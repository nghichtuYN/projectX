"use client";
import React from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ArrowDownToLine, Eye, Save } from "lucide-react";

const CreateCvToolBarComponent = () => {
  return (
    <div className="bg-white w-full pl-3 pr-3 h-16 mx-auto flex items-center gap-4 justify-between">
      <Input
        placeholder="CV chưa đặt tên"
        className="placeholder:text-sm w-[300px]"
      />
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm sm:px-4 px-2"
        >
          <Eye className="w-4 h-4 mr-2" />
          Xem trước
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm sm:px-4 px-2"
        >
          <ArrowDownToLine className="w-4 h-4 mr-2" />
          Lưu và tải xuống
        </Button>
        <Button size="sm" className="text-xs sm:text-sm sm:px-4 px-2">
          <Save className="w-4 h-4 mr-2" />
          Lưu lại
        </Button>
      </div>
    </div>
  );
};

export default CreateCvToolBarComponent;
