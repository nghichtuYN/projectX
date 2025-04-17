import EmployerSidebaHeaderComponent from "@/components/EmployerSidebaHeaderComponent";
import React from "react";
import { MessagingPage } from "./components/MessagingPage";

const MessagePage = () => {
  return (
    <>
      <EmployerSidebaHeaderComponent>
        <div className="flex w-full items-center ">
          <p className="text-lg font-semibold text-secondaryColor">Liên hệ</p>
        </div>
      </EmployerSidebaHeaderComponent>
      <div className="flex min-h-[80vh] w-full flex-col mt-20 pl-8 pr-8">
        <MessagingPage />
        {/* <MessagePage /> */}
      </div>
    </>
  );
};

export default MessagePage;
