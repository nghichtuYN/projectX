'use client'
import CardChangePassword from "./CardChangePassword";
import CardInfo from "../../update-info/components/CardInfo";

const ChangePasswordClient = () => {
  return (
    <div className="w-3/4 grid md:grid-cols-3 min-h-[80vh] pt-12 gap-3 grid-cols-1 mx-auto">
      <CardChangePassword />
      <CardInfo />
    </div>
  );
};

export default ChangePasswordClient;
