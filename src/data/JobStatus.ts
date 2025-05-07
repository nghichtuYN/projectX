type StatusJob = {
  status: number;
  label: string;
};
export const StatusJob: StatusJob[] = [
  { status: 0, label: "Nháp" },
  { status: 1, label: "Chờ duyệt" },
  { status: 2, label: "Từ chối" },
  { status: 3, label: "Kích hoạt" },
  { status: 4, label: "Đóng" },
];
