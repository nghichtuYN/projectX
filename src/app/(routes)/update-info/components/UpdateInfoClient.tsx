'use client'
import CardUpdateInfo from "./CardUpdateInfo";
import CardInfo from "./CardInfo";

const UpdateInfoClient = () => {
  return (
    <div className="w-3/4 grid md:grid-cols-3 min-h-[80vh] pt-12 gap-3 grid-cols-1 mx-auto">
      <CardUpdateInfo />
      <CardInfo />
    </div>
  );
};

export default UpdateInfoClient;
