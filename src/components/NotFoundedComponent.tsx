import { LucideIcon } from "lucide-react";
import React from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";

type Props = {
  content: string;
  icon: LucideIcon;
  columnCount?: number;
};

const NotFoundedComponent = ({
  content,
  icon: Icon,
  columnCount = 4,
}: Props) => {

  return (
    <TableBody>
      <TableRow className="group h-72">
        <TableCell colSpan={columnCount} className="border border-r-2">
          <div className="flex items-center justify-center gap-2">
            <Icon className="h-6 w-6 text-gray-400" />
            <span className="text-lg text-gray-500">{content}</span>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default NotFoundedComponent;
