import { NavItem } from "@/types/navCvItems";
import { Building, File, Lock, User } from "lucide-react";

export const FreelanceSettting: NavItem[] = [
  {
    title: "Đổi mật khẩu",
    icon: Lock,
    content: "password-login",
  },
  {
    title: "Thông tin cá nhân",
    icon: User,
    content: "use_info",
  },
  {
    title: "Xác thực thông tin nhà tuyển dụng",
    icon: Building,
    content: "freelanceRecruitment",
  },
];
