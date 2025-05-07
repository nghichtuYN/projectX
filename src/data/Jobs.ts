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
export const JobAdminOptions: JobOptionsType[] = [
  { value: "all", label: "Tất cả tin tuyển dụng" },
  { value: "0", label: "Tin tuyển dụng chờ duyệt" },
  { value: "1", label: "Tin tuyển dụng đã xác thực" },
  { value: "2", label: "Tin tuyển dụng bị từ chối" },
];
export const FreelanceOptions: JobOptionsType[] = [
  { value: "all", label: "Tất cả" },
  { value: "0", label: "NTD chờ duyệt" },
  { value: "1", label: "NTD đã xác thực" },
  { value: "2", label: "NTD bị từ chối" },
];

export const ApplicationOption: JobOptionsType[] = [
  { value: "all", label: "Hiển thị tất cả CV" },
  { value: "false", label: "Chỉ hiển thị CV chưa xem" },
  { value: "appointment_true", label: "Chỉ hiển thị CV có lịch hẹn" },
  { value: "appointment_false", label: "Chỉ hiển thị CV không có lịch hẹn" },
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
export const SortJob: JobOptionsType[] = [
  { value: "new", label: "Ngày đăng" },
  { value: "up_top", label: "Ngày cập nhật" },
  { value: "urgent", label: "Cần tuyển gấp" },
];
export const SortOptions: JobOptionsType[] = [
  { value: "create", label: "Ngày đăng" },
  { value: "point_asc", label: "Từ thấp đến cao" },
  { value: "point_desc", label: "Từ cao đến thấp" },
];
export const AppointmentOptions: JobOptionsType[] = [
  { value: "all", label: "Tất cả" },
  { value: "true", label: "Trong tuần này" },
];
