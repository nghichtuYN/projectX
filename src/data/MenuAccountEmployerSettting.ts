import { NavItem } from "@/types/navCvItems";
import { Building, File, Lock, User } from "lucide-react";

export const MenuAccountEmployerSettting: NavItem[] = [
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
    title: "Giấy đăng ký doanh nghiệp",
    icon: File,
    content: "gpkd",
  },
  {
    title: "Thông tin công ty",
    icon: Building,
    content: "company",
  },
];
