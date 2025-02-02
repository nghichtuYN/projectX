"use client";
import JobBoardComponent from "@/components/JobBoardComponent";
import SearchFilter from "@/components/SearchFilterComponent";
import { useAuthStore } from "@/store/UserStore";
import { useEffect } from "react";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

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
    </div>
  );
}
