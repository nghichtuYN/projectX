import axiosInstance from "@/lib/axios";
import { axiosJwt } from "./user";

export const BusinessVerify = async (data: FormData) => {
  try {
    const res = await axiosJwt.post("business/verifications", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const UpdateBusinessVerify = async (data: FormData) => {
  try {
    const res = await axiosJwt.patch("business/verifications", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getCompanies = async (
  search: string,
  page: number,
  pageSize: number = 10
) => {
  try {
    const res = await axiosInstance.get(`companies`, {
      params: {
        search,
        page,
        pageSize,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getACompany = async (id: string) => {
  try {
    const res = await axiosInstance.get(`companies/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const rateCompany = async (
  id: string,
  data: { point: number; comment: string; isAnonymous: boolean }
) => {
  try {
    const res = await axiosJwt.post(`companies/${id}/ratings`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getRating = async (
  id: string,
  page: number,
  pageSize: number,
  sort?: string
) => {
  try {
    const res = await axiosInstance.get(`companies/${id}/ratings`, {
      params: {
        page,
        pageSize,
        sort,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getSelf = async () => {
  try {
    const res = await axiosJwt.get(`companies/self`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
