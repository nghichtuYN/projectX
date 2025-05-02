export type NavItem = {
  title: string;
  icon: LucideIcon;
  content: string;
};

import {
  BookOpen,
  FolderPlus,
  LucideIcon,
} from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "Thêm mục",
    icon: FolderPlus,
    content: "sections",
  },
  {
    title: "Hướng dẫn viết CV",
    icon: BookOpen,
    content: "guide",
  },
];
