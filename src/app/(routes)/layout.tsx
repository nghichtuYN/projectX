import "../../app/globals.css";
import Header from "@/app/(routes)/(components)/header";
import React from "react";
import Footer from "./(components)/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full mx-auto ">{children}</main>
      <Footer />
    </div>
  );
}
