"use client";

import { useMutationHook } from "@/hooks/useMutationHook";
import { roles } from "@/lib/utils";
import { getUser, googleSignIn } from "@/services/user";
import { useAuthStore } from "@/store/UserStore";
import { GoogleLogin } from "@react-oauth/google";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

function getUserRole(pathname: string) {
  // Lấy phần cuối của pathname (loại bỏ dấu / và các phần không cần thiết)
  const roleKey =
    pathname.split("/").filter(Boolean).pop()?.toLowerCase() ?? "";

  // Kiểm tra nếu roleKey tồn tại trong getRole
  if (roleKey && roles[roleKey]) {
    return roles[roleKey];
  }

  // Trả về giá trị mặc định nếu không tìm thấy
  return roles[roleKey];
}

// Ví dụ sử dụng
export default function GoogleLoginButton() {
  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();
  const loadUser = useAuthStore((state) => state.loadUser);
  const onSuccessLogin = (data: any) => {
    if (data) {
      loadUser();
      toast.success("Đăng nhập thành công🚀");
      if (pathname === "/login") {
        router.push("/");
      } else if (pathname === "/employer-login") {
        router.push("/employer/dashboard");
      }
    }
  };
  const onError = (error: any) => {
    toast.error("Đăng nhập thất bại🚀");
  };

  const ggLoginMutation = useMutationHook(
    (data: { idToken: string; roleName: string }) => googleSignIn(data),
    (data) => onSuccessLogin(data),
    (error) => onError(error)
  );
  const onSuccess = async (credentialResponse: any) => {
    await ggLoginMutation.mutateAsync({
      idToken: credentialResponse.credential,
      roleName: getUserRole(pathname),
    });
  };
  return (
    <GoogleLogin
      shape={"pill"}
      onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
      onError={() => {
        toast.error("Đăng nhập thất bại🚀");
      }}
    />
  );
}
