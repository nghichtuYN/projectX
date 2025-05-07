import { MessagingPage } from "@/app/(employer)/employer/message/components/MessagingPage";
import React from "react";

const MessageClient = () => {
  return (
    <div className="pt-14 pl-8 pr-8 w-full">
      <div className="container  mx-auto p-4 space-y-4  bg-accent">
        <MessagingPage />
      </div>
    </div>
  );
};

export default MessageClient;
