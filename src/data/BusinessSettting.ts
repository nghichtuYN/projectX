import { NavItem } from "@/types/navCvItems";
import { Building, File, Lock, User } from "lucide-react";

export const BusinessSettting: NavItem[] = [
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
    title: "Thông tin công ty",
    icon: Building,
    content: "company",
  },
];
