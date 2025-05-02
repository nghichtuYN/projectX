"use client";

import { useMutationHook } from "@/hooks/useMutationHook";
import { roles } from "@/lib/utils";
import { getUser, googleSignIn } from "@/services/user";
import { useAuthStore } from "@/store/UserStore";
import { GoogleLogin } from "@react-oauth/google";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

type Props = {
  roleName: string;
  setIsDialogOpen?: Dispatch<SetStateAction<boolean>>
};
export default function GoogleLoginButton({ roleName,setIsDialogOpen }: Props) {
  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();
  const loadUser = useAuthStore((state) => state.loadUser);
  const onSuccessLogin = (data: any) => {
    if (data) {
      loadUser();
      toast.success("Đăng nhập thành công🚀");
      if (pathname === "/login" || pathname === "/register") {
        router.push("/");
      } else if (
        pathname === "/employer-login" ||
        pathname === "/employer-register"
      ) {
        router.push("/employer/dashboard");
      }
    }
  };
  const onError = (error: any) => {
    toast.error("Đăng nhập thất bại");
    // console.log(error?.response?.status)
    if (error?.response?.status === 400 ) {
      if(setIsDialogOpen)
      setIsDialogOpen(true)
    console.log(error?.response?.status)

    }
  };

  const ggLoginMutation = useMutationHook(
    (data: { idToken: string; roleName: string }) =>googleSignIn(data),
    (data) => onSuccessLogin(data),
    (error) => onError(error)
  );
  const onSuccess = async (credentialResponse: any) => {
    await ggLoginMutation.mutateAsync({
      idToken: credentialResponse.credential,
      roleName: roleName,
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
