import axiosInstance from "@/lib/axios";
import axios from "axios";

export const axiosJwt = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://0830-42-116-206-84.ngrok-free.app/capablanca/api/v0/",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: any[] = [];
let isRedirecting = false;

const subscribeTokenRefresh = (callback: any) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = () => {
  refreshSubscribers.forEach((callback: any) => callback());
  refreshSubscribers = [];
};

const redirectToLogin = () => {
  if (typeof window !== "undefined" && !isRedirecting) {
    isRedirecting = true;
    console.log("Redirecting to login (called once)...");
    window.location.href = "/employer-login";
  }
};

// Hàm refresh token
export const refreshToken = async () => {
  try {
    const res = await axiosJwt.post("/auth/refresh-token", {
      skipInterceptor: true,
    });
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

axiosJwt.interceptors.request.use(
  (config) => {
    if (isRedirecting) {
      return Promise.reject(
        new Error("Redirecting to login, request cancelled")
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosJwt.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.skipInterceptor) {
      return Promise.reject(error);
    }

    if (isRedirecting) {
      return Promise.reject(error);
    }
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
          redirectToLogin();
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

// Các hàm API
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
  email: string;
  password: string;
  roleName: string;
}) => {
  try {
    const res = await axiosInstance.post("/auth/sign-up", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async () => {
  try {
    const res = await axiosJwt.get("/users/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  const res = await axiosInstance.post("/auth/sign-out");
  // return res.data;
};

export const googleSignIn = async (data: {
  idToken: string;
  roleName: string;
}) => {
  const res = await axiosInstance.post("/auth/google-auth", data);
  return res.data;
};
export const updateUser = async (data: FormData) => {
  try {
    const res = await axiosJwt.patch("/users", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {}
};
export const getUserCon = async (search: string) => {
  try {
    const res = await axiosJwt.get(`/users`, {
      params: {
        search,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const confirmEmail = async (data: { otp: string }) => {
  try {
    const res = await axiosJwt.post("/auth/confirm-email", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
