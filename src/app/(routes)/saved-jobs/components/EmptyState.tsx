import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
type Props = {
  search: string;
};
const EmptyState = ({ search }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      <div className="relative mb-6">
        <div className="w-32 h-28 bg-secondaryColor rounded-md relative">
          <div className="absolute -top-4 left-4 w-12 h-4 bg-secondaryColor rounded-t-md"></div>

          <div className="absolute -right-4 -top-2 w-3 h-16 bg-gray-100 rotate-6"></div>
          <div className="absolute -right-1 -top-3 w-3 h-16 bg-gray-100 rotate-3"></div>
          <div className="absolute right-3 -top-4 w-3 h-16 bg-gray-100"></div>

          <div className="absolute top-12 left-0 right-0 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="flex gap-6 mb-2">
                <div className="w-2 h-2 rounded-full bg-purple-900"></div>
                <div className="w-2 h-2 rounded-full bg-purple-900"></div>
              </div>
              <div className="w-6 h-2 border-b-2 border-purple-900 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-2 h-2 bg-gray-200 rounded-full opacity-50"></div>
        <div className="absolute top-4 left-4 w-3 h-3 bg-gray-200 rounded-full opacity-50"></div>
        <div className="absolute top-2 right-0 w-2 h-2 bg-gray-200 rounded-full opacity-50"></div>
      </div>

      <p className="text-gray-800 text-lg font-medium mb-6">
        {search ===""
          ? "Bạn chưa lưu công việc nào!"
          : "Không tìm thấy công việc nào"}
      </p>
      <Link href={`/find-jobs`}>
        <Button className="bg-secondaryColor  text-white font-medium px-6 py-2 rounded-md">
          Tìm việc ngay
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
