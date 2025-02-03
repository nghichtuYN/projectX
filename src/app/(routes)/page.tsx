"use client";
import JobBoardComponent from "@/components/JobBoardComponent";
import SearchFilter from "@/components/SearchFilterComponent";
import { useAuthStore } from "@/store/UserStore";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [value, setValue] = useState("");

  useEffect(() => {
    setUser({ name: "test", email: "test", id: "2" });
  }, []);
  if (!user) {
    return <p>Đang tải thông tin người dùng...</p>;
  }
  return (
    <div>
      <SearchFilter />
      <JobBoardComponent />
      <section className="min-h-svh">
        <ReactQuill
          className="w-3/4 h-[300px]"
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </section>
    </div>
  );
}
