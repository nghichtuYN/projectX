"use client";
import "../../app/globals.css";
import Header from "@/app/(routes)/(components)/header";
import React, { useEffect } from "react";
import Footer from "./(components)/Footer";
import { notFound, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/UserStore";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const protectedCandidateRoutes = [
    "/profile",
    "/applied-jobs",
    "/saved-jobs",
    "/uploadCv",
    "/messages",
    "/jobs",
  ];
  const needsAuthCandidate = protectedCandidateRoutes.some((protectedPath) =>
    pathName.startsWith(protectedPath)
  );
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (user && user?.roles[0] !== "Candidate" && needsAuthCandidate) {
      return notFound();
    }
  }, [user]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full mx-auto ">{children}</main>
      <Footer />
    </div>
  );
}
