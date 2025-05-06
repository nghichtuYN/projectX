import React from "react";
import {
  BriefcaseBusiness,
  Building2,
  Heart,
  LaptopMinimalCheck,
  Medal,
  Search,
  Sparkles,
  FileUser,
  FileUp,
  SquareUserRound,
  SquareTerminal,
} from "lucide-react";
type subMenu = {
  title: string;
  href?: string;
  icon?: React.ElementType;
};
export type Menu = {
  title: string;
  subMenu?: subMenu[];
  href: string;
};
export const Menu: Menu[] = [
  {
    title: "Việc Làm",
    href: "/find-jobs",
    subMenu: [
      {
        title: "Tìm việc làm",
        href: "/find-jobs",
        icon: Search,
      },
      {
        title: "Việc làm đã ứng tuyển ",
        href: "/applied-jobs",
        icon: BriefcaseBusiness,
      },
      {
        title: "Việc làm đã lưu",
        href: "/saved-jobs",
        icon: Heart,
      },
      {
        title: "Việc làm phù hợp",
        href: "/docs/primitives/progress",
        icon: LaptopMinimalCheck,
      },
     
     
      {
        title: "Danh sách công ty",
        href: "/company",
        icon: Building2,
      },
      {
        title: "Top công ty",
        href: "/docs/primitives/tooltip",
        icon: Sparkles,
      },
    ],
    // icon: SquarePen
  },
  {
    title: "Tạo CV",
    href: "/create-cv",
  },

  {
    title: "Diễn đàn",
    href: "/forum",
  },
];
