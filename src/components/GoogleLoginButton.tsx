"use client";

import { useMutationHook } from "@/hooks/useMutationHook";
import { getUser, googleSignIn } from "@/services/user";
import { useAuthStore } from "@/store/UserStore";
import { GoogleLogin } from "@react-oauth/google";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

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
    (data: { idToken: string }) => googleSignIn(data),
    (data) => onSuccessLogin(data),
    (error) => onError(error)
  );
  const onSuccess = async (credentialResponse: any) => {
    await ggLoginMutation.mutateAsync({
      idToken: credentialResponse.credential,
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
