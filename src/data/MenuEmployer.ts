import {
  AlignJustify,
  AppWindow,
  AudioWaveform,
  BadgeInfo,
  BriefcaseBusiness,
  CalendarCheck2,
  CalendarClock,
  ClipboardList,
  Command,
  FileClock,
  FileText,
  FileUser,
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
      logo: AppWindow ,
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
      title: "Ứng viên",
      url: "#",
      icon: Users,
      isActive: true,

      items: [
        {
          title: "Hồ sơ ứng tuyển",
          url: "#",
          icon: FileUser,
        },
        {
          title: "Hồ sơ đã lưu",
          url: "/employer/recruitment-campaigns",
          icon: Heart,
        },
      ],
    },
    {
      title: "Dịch vụ",
      url: "#",
      icon: Package,
      isActive: true,

      items: [
        {
          title: "Mua dịch vụ",
          url: "#",
          icon: ShoppingCart,
        },
        {
          title: "Lịch sử mua hàng",
          url: "#",
          icon: CalendarClock,
        },
        {
          title: "Lịch sử kích hoạt",
          url: "#",
          icon: CalendarCheck2,
        },
        {
          title: "Lịch sử đã lưu",
          url: "#",
          icon: FileClock,
        },
        {
          title: "Thông tin thanh toán",
          url: "#",
          icon: BadgeInfo,
        },
      ],
    },
    // {
    //   title: "Quảng bá thương hiệu",
    //   url: "#",
    //   icon: Megaphone,
    //   isActive: true,

    //   items: [
    //     {
    //       title: "Giới thiệu về công ty",
    //       url: "#",
    //       icon: AlignJustify,
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Cài đặt tài khoản",
      url: "/employer/settings/password-login",
      icon: Settings,
    },
  ],
};
