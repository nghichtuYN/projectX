import axiosInstance from "@/lib/axios";
import axios from "axios";

export const axiosJwt = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
let isRefreshing = false;
let refreshSubscribers: any = [];

// Hàm thêm subscriber vào danh sách chờ
const subscribeTokenRefresh = (callback: any) => {
  refreshSubscribers.push(callback);
};

// Hàm thông báo tất cả subscriber khi refresh hoàn tất
const onRefreshed = () => {
  refreshSubscribers.forEach((callback: any) => callback());
  refreshSubscribers = [];
};

// Hàm refresh token
export const refreshToken = async () => {
  try {
    const res = await axiosJwt.post("/auth/refresh-token", {
      skipInterceptor: true,
    });
    return res.data;
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
};

// Interceptor xử lý response
axiosJwt.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.skipInterceptor) {
      return Promise.reject(error);
    }
    // Xử lý lỗi 419 hoặc Network Error
    if (
      (error.response?.status === 419 || error.code === "ERR_NETWORK") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          console.log("Refreshing token...");
          const ress = await refreshToken();
          console.log("Refresh successful:", ress.message);
          isRefreshing = false;
          onRefreshed();
          return axiosJwt(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          onRefreshed();
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(() => {
          resolve(axiosJwt(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);
export const signIn = async (data: { email: string; password: string }) => {
  try {
    const res = await axiosInstance.post("/auth/sign-in", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const signUp = async (data: {
  fullname: string;
  username: string;
  password: string;
  roleName: string;
}) => {
  const res = await axiosInstance.post("/auth/sign-up", data);
  return res.data;
};

export const getUser = async () => {
  const res = await axiosJwt.get("/users/me");
  return res.data;
};
export const signOut = async () => {
  const res = await axiosInstance.post("/auth/sign-out");
  // return res.data;
};
export const googleSignIn = async (data: { idToken: string }) => {
  try {
    const res = await axiosInstance.post("/auth/google-sign-in", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
