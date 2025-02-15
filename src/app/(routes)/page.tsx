"use client";
import CompnayBoardComponent from "@/components/CompanyBoardComponent";
import DraggableForm from "@/components/DraggableForm";
import JobBoardComponent from "@/components/JobBoardComponent";
import SearchFilter from "@/components/SearchFilterComponent";
import { useAuthStore } from "@/store/UserStore";
import { useEffect } from "react";
// import "react-quill-new/dist/quill.snow.css";
// import dynamic from "next/dynamic";

// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  // const [value, setValue] = useState("");

  useEffect(() => {
    setUser({ name: "test", email: "test", id: "2" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user) {
    return <p>Đang tải thông tin người dùng...</p>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-primaryColor">
        <SearchFilter />
      </div>
      <section className="w-full bg-accent flex justify-center">
        <JobBoardComponent />
      </section>
      <section className="w-full flex justify-center  bg-white">
        <CompnayBoardComponent />
      </section>
      <DraggableForm />
      {/* <section className="min-h-svh">
        <ReactQuill
          className="w-3/4 h-[300px]"
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </section> */}
    </div>
  );
}
