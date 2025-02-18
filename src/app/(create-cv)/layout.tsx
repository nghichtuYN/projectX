import Header from "@/app/(routes)/(components)/header";
import React from "react";

const CreateCvLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Header />
      <div className="xl:mt-16 scale-[0.9] sm:scale-[1] md:scale-[1] origin-top">{children}</div>
    </div>
  );
};

export default CreateCvLayout;
