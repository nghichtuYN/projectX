import React from "react";
import { CircleArrowUp, Eye, SquarePen, Lock, LogOut } from "lucide-react";

export const AccountMenu: {
  title: string;
  href?: string;
  icon?: React.ElementType;
}[] = [
  {
    title: "Cập nhật thông tin cá nhân",
    href: "/docs/primitives/tooltip",
    icon: SquarePen,
  },
  {
    title: "Nâng cấp tài khoản VIP",
    href: "/docs/primitives/tooltip",
    icon: CircleArrowUp,
  },
  {
    title: "Nhà tuyển dụng xem hồ sơ",
    href: "/docs/primitives/tooltip",
    icon: Eye,
  },
  {
    title: "Đổi mật khẩu",
    href: "/docs/primitives/tooltip",
    icon: Lock,
  },
];
