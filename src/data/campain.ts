

type campaignOptionsType = {
  value: string;
  label: string;
};
export const campaignOptions: campaignOptionsType[] = [
  { value: "all", label: "Tất cả chiến dịch" },
  { value: "only_open", label: "Chỉ chiến dịch đang mở" },
  { value: "has_new_cv", label: "Có CV ứng viên mới cần xem" },
  { value: "has_publishing_job", label: "Tin tuyển dụng đang hiển thị" },
  { value: "has_running_service", label: "Có dịch vụ đang chạy" },
  { value: "expired_job", label: "Tin tuyển dụng hết hạn hiển thị" },
  { value: "waitting_approve_job", label: "Tin tuyển dụng đang xét duyệt" },
];
type TabLists = {
  href: (
    pathname: string,
    keyWord?: string,
    quickFilter?: string,
    label?: string
  ) => string;
  value: string;
  label: string;
};
export const tabLists: TabLists[] = [
  {
    href: (pathname) => `${pathname}?active_tab=jobs&page=1`,
    value: "jobs",
    label: "Tin tuyển dụng",
  },
  {
    href: (pathname, keyWord, quickFilter, label) =>
      `${pathname}?active_tab=apply_cv&keyword=${encodeURIComponent(
        keyWord || ""
      )}&quick_filter=${quickFilter || ""}&label=${label || ""}`,
    value: "apply_cv",
    label: "CV ứng tuyển",
  },
  // {
  //   href: (pathname) => `${pathname}?active_tab=viewed_job`,
  //   value: "viewed_job",
  //   label: "Ứng viên đã xem tin",
  // },
  {
    href: (pathname) => `${pathname}?active_tab=cv_recommendation`,
    value: "cv_recommendation",
    label: "CV đề xuất",
  },
  // {
  //   href: (pathname) => `${pathname}?active_tab=paid_cv`,
  //   value: "paid_cv",
  //   label: "CV tìm kiếm",
  // },
  // {
  //   href: (pathname) => `${pathname}?active_tab=followed_cv`,
  //   value: "followed_cv",
  //   label: "CV đang theo dõi",
  // },
  {
    href: (pathname) => `${pathname}?active_tab=service`,
    value: "service",
    label: "Dịch vụ",
  },
];
