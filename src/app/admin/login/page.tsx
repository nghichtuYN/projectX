"use client";
import React from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";

const AdminLoginPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="absolute top-8 md:top-12 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-secondaryColor"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        <span className="text-xl font-bold">ProjectX</span>
      </div>

      <div className="w-full max-w-md px-8">
        <div className="mb-8 flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-bold">Đăng Nhập Quản Trị</h1>
          <p className="text-gray-500">
            Nhập thông tin đăng nhập để truy cập bảng điều khiển quản trị
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm">
          Không phải quản trị viên?{" "}
          <Link
            href="/"
            className="font-medium text-secondaryColor hover:text-hoverColor"
          >
            Quay lại trang chính
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ProjectX. All rights reserved.
      </div>
    </div>
  );
};

export default AdminLoginPage;
