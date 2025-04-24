"use client";
import { MessagingPage } from "@/app/(employer)/employer/message/components/MessagingPage";
import Header from "@/app/(routes)/(components)/header";
export default function DirectMessaging() {
  return (
    <div className={"flex min-h-[80vh] w-full flex-col sm:scale-10"}>
      <Header />
      <MessagingPage />
    </div>
  );
}
