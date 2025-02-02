"use client";

import { GoogleLogin } from "@react-oauth/google";
import { redirect } from "next/navigation";

export default function GoogleLoginButton() {
  return (
    <GoogleLogin
      onSuccess={(response) => {
        console.log("Google Token:", response.credential);
        redirect("/");
      }}
      onError={() => console.log("Đăng nhập thất bại")}
      // auto_select={true}
    />
  );
}
