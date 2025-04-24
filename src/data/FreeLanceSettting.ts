import { NavItem } from "@/types/navCvItems";
import { FileUser, Lock, User } from "lucide-react";

export const FreelanceSettting: NavItem[] = [
  {
    title: "Đổi mật khẩu",
    icon: Lock,
    content: "password-login",
  },
  {
    title: "Thông tin tài khoản",
    icon: User,
    content: "use_info",
  },
  {
    title: "Thông tin nhà tuyển dụng",
    icon: FileUser,
    content: "freelance-recruitment",
  },
];
