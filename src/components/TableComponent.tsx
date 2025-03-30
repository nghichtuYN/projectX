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

// Định nghĩa kiểu cho cột
type Column<T> = {
  renderRow: keyof T | ((r: T) => React.ReactNode);
  header: string;
  className?: string;
};

// Định nghĩa props cho component
type TableProps<T extends Record<string, any>> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  rowKey: keyof T;
};

// Di chuyển <T> đúng cách để TypeScript hiểu
const TableComponent = <T extends Record<string, any>>({
  data,
  columns,
  className,
  rowKey,
}: TableProps<T>) => {
  return (
    <Table className={cn("w-full", className)}>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index} className={column.className}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={String(item[rowKey])}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className={column.className}>
                  {typeof column.renderRow === "function"
                    ? column.renderRow(item)
                    : (item[column.renderRow] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              Không có dữ liệu
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
