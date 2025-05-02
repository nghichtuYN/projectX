import {
  Building,
  Command,
  Files,
  FileText,
  FileType,
  FileUser,
  Heart,
  LayoutDashboard,
  MessageCircle,
  MonitorCog,
  PanelsTopLeft,
  ReceiptText,
  Settings,
  SquareUserRound,
  TableOfContents,
  UserCog,
  UserRoundPen,
  Users,
} from "lucide-react";
export const MenuAdmin = {
  teams: [
    {
      name: "ProjectX",
      logo: Command,
      plan: "Dành cho nhà quản trị viên",
    },
  ],
  navMain: [
    {
      title: "Tổng quan",
      url: "#",
      icon: PanelsTopLeft,
      isActive: true,
      items: [
        {
          title: "Bảng tin",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Liên hệ",
          url: "/admin/message",
          icon: MessageCircle,
        },
      ],
    },
    {
      title: "Nhà tuyển dụng",
      url: "#",
      icon: Users,
      isActive: true,

      items: [
        {
          title: "Nhà tuyển dụng công ty",
          url: "/admin/company",
          icon: Building,
        },
        {
          title: "Nhà tuyển dụng tự do",
          url: "/admin/freelance",
          icon: SquareUserRound,
        },
      ],
    },
    {
      title: "Tin tuyển dụng",
      url: "#",
      icon: FileText,
      isActive: true,

      items: [
        {
          title: "Danh sách tin tuyển dụng",
          url: "#",
          icon: Files,
        },
      ],
    },
    {
      title: "Hệ thống",
      url: "#",
      icon: MonitorCog,
      isActive: true,

      items: [
        {
          title: "Kỹ năng",
          url: "/admin/skills",
          icon: UserCog,
        },
        {
          title: "Hình thức làm việc",
          url: "/admin/contract-type",
          icon: ReceiptText,
        },
        {
          title: "Loại hình công việc",
          url: "/admin/job-types",
          icon: FileType,
        },
        {
          title: "Cấp bậc công việc",
          url: "/admin/job-levels",
          icon: UserRoundPen,
        },
        {
          title: "Lĩnh vực ngành nghề",
          url: "/admin/majors",
          icon: TableOfContents,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Cài đặt tài khoản",
      url: "/admin/settings/password-login",
      icon: Settings,
    },
  ],
};
