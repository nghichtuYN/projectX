import React from "react";
import {
  CircleArrowUp,
  Eye,
  SquarePen,
  Lock,
  LogOut,
  FileClock,
} from "lucide-react";

export const AccountMenu: {
  title: string;
  href?: string;
  icon?: React.ElementType;
}[] = [
  {
    title: "Cập nhật thông tin cá nhân",
    href: "/update-info",
    icon: SquarePen,
  },
  {
    title: "Lịch hẹn",
    href: "/appointment",
    icon: FileClock,
  },
  {
    title: "Nạp X Token",
    href: "/top-up",
    icon: FileClock,
  },
  {
    title: "Đổi mật khẩu",
    href: "/change-password",
    icon: Lock,
  },
];
