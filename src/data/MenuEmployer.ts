import {
  AlarmClock,
  AlignJustify,
  AppWindow,
  AudioWaveform,
  BadgeInfo,
  BadgePoundSterling,
  BriefcaseBusiness,
  CalendarCheck2,
  CalendarClock,
  ClipboardList,
  Command,
  FileClock,
  FileUser,
  FolderClock,
  Gem,
  Heart,
  LayoutDashboard,
  Megaphone,
  MessageCircle,
  Package,
  PanelsTopLeft,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
export const MenuEmployer = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "ProjectX",
      logo: AppWindow,
      plan: "Dành cho nhà tuyển dụng",
    },
    {
      name: "",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
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
          url: "/employer/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Liên hệ",
          url: "/employer/message",
          icon: MessageCircle,
        },
      ],
    },
    {
      title: "Chiến dịch tuyển dụng",
      url: "#",
      icon: BriefcaseBusiness,
      isActive: true,

      items: [
        {
          title: "Danh sách chiến dịch",
          url: "/employer/recruitment-campaigns",
          icon: ClipboardList,
        },
      ],
    },
    {
      title: "Lịch hẹn",
      url: "#",
      icon: FolderClock,
      isActive: true,

      items: [
        {
          title: "Danh sách lịch hẹn",
          url: "/employer/appointments",
          icon: FileClock,
        },
      ],
    },
    {
      title: "Dịch vụ",
      url: "/services",
      icon: Package,
      isActive: true,

      items: [
        {
          title: "Nâng cấp tài khoản",
          url: "/employer/services",
          icon: Gem,
        },
        {
          title: "Nạp tiền",
          url: "/employer/top-up",
          icon: BadgePoundSterling,
        },
        {
          title: "Lịch sử giao dịch",
          url: "#",
          icon: CalendarCheck2,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Cài đặt tài khoản",
      url: "/employer/settings/password-login",
      icon: Settings,
    },
  ],
};
