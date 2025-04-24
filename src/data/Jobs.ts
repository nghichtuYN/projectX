type JobOptionsType = {
  value: string;
  label: string;
};
export const JobOptions: JobOptionsType[] = [
  { value: "all", label: "Tất cả tin tuyển dụng" },
  { value: "has_new_cv", label: "Tin tuyển dụng có CV mới" },
  { value: "has_running_service", label: "Tin tuyển dụng có dịch vụ" },
  { value: "expired_job", label: "Tin tuyển dụng hết hạn hiển thị" },
  { value: "waitting_approve_job", label: "Tin tuyển dụng đang xét duyệt" },
  { value: "haven_approve_job", label: "Tin tuyển dụng đã được duyệt" },
];

export const CompanyOptions: JobOptionsType[] = [
  { value: "all", label: "Tất cả công ty" },
  { value: "0", label: "Công ty chờ duyệt" },
  { value: "1", label: "Công ty đã xác thực" },
  { value: "2", label: "Công ty bị từ chối" },
];

export const ApplicationOption: JobOptionsType[] = [
  { value: "all", label: "Hiển thị tất cả" },
  { value: "notViewed", label: "Chỉ hiển thị CV chưa xem" },
];
export const LabelOption: JobOptionsType[] = [
  { value: "is_not_label", label: "Chưa gắn nhãn" },
  { value: "1", label: "Ưu tiền" },
  { value: "2", label: "Hiển thị tất cả" },
];
export const ProcessOption: JobOptionsType[] = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Shortlisted" },
  { value: "2", label: "Interviewing" },
  { value: "3", label: "Offered" },
  { value: "4", label: "Hired" },
  { value: "5", label: "Rejected" },
];
