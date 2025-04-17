"use client";
import React, { JSX } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type Props = {
  className?: string;
  currentPage: number; 
  totalPages: number;
};

const PaginationComponent = ({ className, currentPage, totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Hàm tạo URL mới với page parameter
  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Tính toán các trang để hiển thị
  const getPaginationItems = () => {
    const items: JSX.Element[] = [];
    const maxVisiblePages = 5; // Số trang tối đa hiển thị trước khi dùng ellipsis
    const ellipsis = (
      <PaginationItem key="ellipsis">
        <PaginationEllipsis />
      </PaginationItem>
    );

    if (totalPages <= maxVisiblePages) {
      // Nếu tổng số trang nhỏ hơn hoặc bằng maxVisiblePages, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageURL(i)}
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                router.push(createPageURL(i));
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Trường hợp có nhiều trang, cần ellipsis
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      // Luôn hiển thị trang đầu
      if (startPage > 2) {
        items.push(
          <PaginationItem key={1}>
            <PaginationLink
              href={createPageURL(1)}
              onClick={(e) => {
                e.preventDefault();
                router.push(createPageURL(1));
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        );
        items.push(ellipsis);
      }

      // Hiển thị các trang xung quanh trang hiện tại
      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageURL(i)}
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                router.push(createPageURL(i));
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Luôn hiển thị trang cuối
      if (endPage < totalPages - 1) {
        items.push(ellipsis);
        items.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href={createPageURL(totalPages)}
              onClick={(e) => {
                e.preventDefault();
                router.push(createPageURL(totalPages));
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        {/* Nút Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                router.push(createPageURL(currentPage - 1));
              }
            }}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* Các trang */}
        {getPaginationItems()}

        {/* Nút Next */}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                router.push(createPageURL(currentPage + 1));
              }
            }}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;