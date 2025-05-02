import CampainClient from "./(components)/CampainClient";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Danh sách chiến dịch tuyển dụng",
  description: "Danh sách tất cả chiến dịch tuyển dụng của người dùng",
};
const CampaignPage = () => {
  return (
    <>
      <CampainClient />
    </>
  );
};

export default CampaignPage;
