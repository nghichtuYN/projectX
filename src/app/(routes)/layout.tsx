import Footer from "@/components/Footer";
import "../../app/globals.css";
import Header from "@/components/header";
import React from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="main-layout w-full lg:mt-12 mb-2 ">{children}</div>
      <Footer />
    </>
  );
}
