import Header from "@/app/(routes)/(components)/header";
import React from "react";

const CreateCvLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="">{children}</div>
    </div>
  );
};

export default CreateCvLayout;
