export type Level = {
  label: string;
  value: string;
};
export const Levels: Level[] = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Nhân viên",
    value: "staff",
  },
  {
    label: "Trường phòng",
    value: "hod",
  },
  {
    label: "Trường phòng/Phó phòng",
    value: "deputy",
  },
  {
    label: "Quản lý/Giám sát",
    value: "manager",
  },
  {
    label: "Trường chi nhánh",
    value: "branch_manager",
  },
  {
    label: "Phó giám đốc",
    value: "deputy director",
  },
  {
    label: "Giám đốc",
    value: "director",
  },
  {
    label: "Thực tập sinh",
    value: "intern",
  },
];
