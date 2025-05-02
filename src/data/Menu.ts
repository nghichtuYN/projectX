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
        title: "Việc làm IT",
        href: "/docs/primitives/scroll-area",
        icon: SquareTerminal,
      },
      {
        title: "Việc làm Senior",
        href: "/docs/primitives/tabs",
        icon: Medal,
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
    title: "Hồ sơ & CV",
    href: "/manageCv",
    subMenu: [
      {
        title: "Tạo CV",
        href: "/create-cv",
        icon: FileUser,
      },
      {
        title: "Tải CV lên",
        href: "/uploadCv",
        icon: FileUp,
      },
      {
        title: "Quản lý CV",
        href: "/manageCv",
        icon: FileUser,
      },
      {
        title: "TopCV",
        href: "/docs/primitives/tooltip",
        icon: SquareUserRound,
      },
    ],
    // icon:CircleArrowUp
  },
  {
    title: "Công cụ",
    href: "/cong-cu",
    subMenu: [
      {
        title: "Tạo CV",
        href: "/docs/primitives/tooltip",
        icon: FileUser,
      },
      {
        title: "Tải CV lên",
        href: "/docs/primitives/tooltip",
        icon: FileUp,
      },
      {
        title: "Quản lý CV",
        href: "/docs/primitives/tooltip",
        icon: FileUser,
      },
      {
        title: "TopCV",
        href: "/docs/primitives/tooltip",
        icon: SquareUserRound,
      },
    ],
    // icon: Eye
  },
  // {
  //   title: "Cẩm nang nghề nghiệp",
  //   href: "/docs/primitives/tooltip",
  //   subMenu: [
  //     {
  //       title: "Tạo CV",
  //       href: "/docs/primitives/tooltip",
  //       icon: FileUser,
  //     },
  //     {
  //       title: "Tải CV lên",
  //       href: "/docs/primitives/tooltip",
  //       icon: FileUp,
  //     },
  //     {
  //       title: "Quản lý CV",
  //       href: "/docs/primitives/tooltip",
  //       icon: FileUser,
  //     },
  //     {
  //       title: "TopCV",
  //       href: "/docs/primitives/tooltip",
  //       icon: SquareUserRound,
  //     },
  //   ],
  //   // icon: Lock
  // },
  {
    title: "Diễn đàn",
    href: "/forum",

    // href="javascript:void(0)",
    // icon: LogOut
  },
];
