"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type SkeletonTableProps = {
  columnsCount: number;
  rowsCount?: number;
  className?: string;
};

// Skeleton component
const SkeletonTableComponent = ({
  columnsCount,
  rowsCount = 5,
  className,
}: SkeletonTableProps) => {
  return (
    <Table className={cn(className)}>
      <TableHeader>
        <TableRow>
          {Array.from({ length: columnsCount }).map((_, index) => (
            <TableHead
              key={index}
              className="border border-r-2 bg-fourthColor text-secondaryColor font-semibold"
            >
              <div className="h-6 bg-gray-300 animate-pulse rounded" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowsCount }).map((_, rowIndex) => (
          <TableRow key={rowIndex} className="group h-28 hover:bg-fourthColor">
            {Array.from({ length: columnsCount }).map((_, colIndex) => (
              <TableCell key={colIndex} className="border border-r-2">
                <div className="h-6 bg-gray-200 animate-pulse rounded" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkeletonTableComponent;
