'use client'
import { useAuthStore } from "@/store/UserStore";
import FormCreateFreelance from "./components/FormCreateFreelance";
import FormUpdateFreelance from "./components/FormUpdateFreelance";

const FreelanceRecruitmentPage = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="container flex flex-col gap-4 mt-3 px-3">
      <div className="text-sm font-semibold">
        Giấy tờ xác thực nhà tuyển dụng tự do
      </div>
      {user?.verificationSubmitted ? (
        <FormUpdateFreelance />
      ) : (
        <FormCreateFreelance />
      )}
    </div>
  );
};

export default FreelanceRecruitmentPage;
