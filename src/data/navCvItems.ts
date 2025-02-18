import { NavItem } from "@/types/navCvItems";
import {
  BookOpen,
  Briefcase,
  FileText,
  FolderPlus,
  PaintBucket,
} from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "Đổi mẫu CV",
    icon: PaintBucket,
    content: "templates",
  },
  {
    title: "Thêm mục",
    icon: FolderPlus,
    content: "sections",
  },
  {
    title: "Thư viện CV",
    icon: FileText,
    content: "library",
  },
  {
    title: "Hướng dẫn viết CV",
    icon: BookOpen,
    content: "guide",
  },
  {
    title: "Việc làm phù hợp",
    icon: Briefcase,
    content: "jobs",
  },
];
