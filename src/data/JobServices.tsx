import { ServiceJobs } from "@/services/services";
export type JobService = {
  items: ServiceJobs[];
};
export const JobServices = {
  items: [
    {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Mark as highlight",
      type: "Highlight",
      description:
        "Hiển thị tin tại khu vực việc làm nổi bật (tối đa 14 ngày). 5 X Token/ngày hoặc 10.000đ/ngày (7 ngày đầu), 12.000đ/ngày từ ngày thứ 8.",
      dayLimit: 14,
      cashPrice: 10000,
      xTokenPrice: 5,
    },
    {
      id: "00000000-0000-0000-0000-000000000002",
      name: "Mark as urgent",
      type: "Urgent",
      description:
        "Gắn thẻ Urgent cho tin tuyển dụng (tối đa 7 ngày). Hỗ trợ lọc bằng bộ lọc Urgent. Giá: 20 X Token hoặc 40.000đ/tin.",
      dayLimit: 7,
      cashPrice: 40000,
      xTokenPrice: 20,
    },
    {
      id: "00000000-0000-0000-0000-000000000003",
      name: "Mark as hot",
      type: "Hot",
      description:
        "Gắn thẻ Hot cho tin tuyển dụng (tối đa 14 ngày). Hỗ trợ lọc bằng bộ lọc Hot. Giá: 20 X Token hoặc 40.000đ/tin.",
      dayLimit: 14,
      cashPrice: 40000,
      xTokenPrice: 20,
    },
  ],
};
