import "../../app/globals.css";
import Header from "@/components/header";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="main-layout lg:mt-12">{children}</div>
    </div>
  );
}
