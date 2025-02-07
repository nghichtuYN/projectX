import React from "react";
import Link from "next/link";
import { Facebook, Youtube, Linkedin, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
};

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-4 hidden sm:block">
      <h3 className="font-semibold text-lg text-secondaryColor">{title}</h3>
      <nav className="space-y-2 text-sm">{children}</nav>
    </div>
  );
};

const AccordionFooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <AccordionItem value={title} className="sm:hidden">
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <nav className="space-y-2">{children}</nav>
      </AccordionContent>
    </AccordionItem>
  );
};

const Footer = () => {
  return (
    <footer className="bg-background py-12 px-4 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column - Company Info */}
        <div className="md:col-span-3 space-y-8">
          <div className="space-y-4">
            <p className="text-3xl text-secondaryColor font-extrabold">
              ProjecX
            </p>
            <p className="text-sm text-muted-foreground">
              Tiếp lợi thế - Nối thành công
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Liên hệ</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                Hotline:{" "}
                <Button variant="link" asChild className="h-auto p-0">
                  <a href="tel:02466805588">(024) 6680 5588</a>
                </Button>{" "}
                (Giờ hành chính)
              </p>
              <p>
                Email:{" "}
                <Button variant="link" asChild className="h-auto p-0">
                  <a href="mailto:hotro@ProjectX.vn">hotro@ProjectX.vn</a>
                </Button>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Cộng đồng ProjectX</h3>
            <div className="flex gap-2">
              <Button variant="outline"  size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Music2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator orientation="vertical" className="hidden md:block" />

        {/* Right Columns - Navigation */}
        <div className="md:col-span-8">
          {/* Desktop version */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About ProjectX */}
            <FooterSection title="Về ProjectX">
              {[
                "Giới thiệu",
                "Góc báo chí",
                "Tuyển dụng",
                "Liên hệ",
                "Hỏi đáp",
                "Chính sách bảo mật",
                "Điều khoản dịch vụ",
                "Quy chế hoạt động",
              ].map((item) => (
                <div key={item}>
                  <FooterLink href="#">{item}</FooterLink>
                </div>
              ))}
            </FooterSection>

            {/* Profile and CV */}
            <FooterSection title="Hồ sơ và CV">
              {[
                "Quản lý CV của bạn",
                "ProjectX Profile",
                "Hướng dẫn viết CV",
                "Thư viện CV theo ngành nghề",
                "Review CV",
              ].map((item) => (
                <div key={item}>
                  <FooterLink href="#">{item}</FooterLink>
                </div>
              ))}
            </FooterSection>

            {/* Explore */}
            <FooterSection title="Khám phá">
              {[
                "Ứng dụng di động ProjectX",
                "Tính lương Gross - Net",
                "Tính lãi suất kép",
                "Lập kế hoạch tiết kiệm",
                "Tính bảo hiểm thất nghiệp",
                "Tính bảo hiểm xã hội một lần",
                "Trắc nghiệm MBTI",
                "Trắc nghiệm MI",
              ].map((item) => (
                <div key={item}>
                  <FooterLink href="#">{item}</FooterLink>
                </div>
              ))}
            </FooterSection>

            {/* Career Building */}
            <div className="space-y-8">
              <FooterSection title="Xây dựng sự nghiệp">
                {[
                  "Việc làm tốt nhất",
                  "Việc làm lương cao",
                  "Việc làm quản lý",
                  "Việc làm IT",
                  "Việc làm Senior",
                  "Việc làm bán thời gian",
                ].map((item) => (
                  <div key={item}>
                    <FooterLink href="#">{item}</FooterLink>
                  </div>
                ))}
              </FooterSection>

              <FooterSection title="Phát triển bản thân">
                <FooterLink href="#">ProjectX Contest</FooterLink>
              </FooterSection>
            </div>
          </div>

          {/* Mobile version */}
          <Accordion type="single" collapsible className="sm:hidden">
            <AccordionFooterSection title="Về ProjectX">
              {[
                "Giới thiệu",
                "Góc báo chí",
                "Tuyển dụng",
                "Liên hệ",
                "Hỏi đáp",
                "Chính sách bảo mật",
                "Điều khoản dịch vụ",
                "Quy chế hoạt động",
              ].map((item) => (
                <div key={item}>
                  <FooterLink href="#">{item}</FooterLink>
                </div>
              ))}
            </AccordionFooterSection>

            <AccordionFooterSection title="Hồ sơ và CV">
              {[
                "Quản lý CV của bạn",
                "ProjectX Profile",
                "Hướng dẫn viết CV",
                "Thư viện CV theo ngành nghề",
                "Review CV",
              ].map((item) => (
                <div key={item}>
                  <FooterLink href="#">{item}</FooterLink>
                </div>
              ))}
            </AccordionFooterSection>

            <AccordionFooterSection title="Khám phá">
              {[
                "Ứng dụng di động ProjectX",
                "Tính lương Gross - Net",
                "Tính lãi suất kép",
                "Lập kế hoạch tiết kiệm",
                "Tính bảo hiểm thất nghiệp",
                "Tính bảo hiểm xã hội một lần",
                "Trắc nghiệm MBTI",
                "Trắc nghiệm MI",
              ].map((item) => (
                <div key={item}>
                  <FooterLink href="#">{item}</FooterLink>
                </div>
              ))}
            </AccordionFooterSection>

            <AccordionFooterSection title="Xây dựng sự nghiệp">
              {[
                "Việc làm tốt nhất",
                "Việc làm lương cao",
                "Việc làm quản lý",
                "Việc làm IT",
                "Việc làm Senior",
                "Việc làm bán thời gian",
              ].map((item) => (
                <div key={item}>
                  <FooterLink href="#">{item}</FooterLink>
                </div>
              ))}
            </AccordionFooterSection>

            <AccordionFooterSection title="Phát triển bản thân">
              <FooterLink href="#">ProjectX Contest</FooterLink>
            </AccordionFooterSection>
          </Accordion>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
