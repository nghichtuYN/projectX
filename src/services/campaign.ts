import axiosInstance from "@/lib/axios";
import { axiosJwt } from "./user";

export const getAllCampaigns = async (searchValue: string, page: number) => {
  const response = await axiosJwt.get("/campaigns", {
    params: {
      search: searchValue,
      page: page,
    },
  });
  return response.data;
};
export const createCampaign = async (data: any) => {
  try {
    const response = await axiosJwt.post("/campaigns", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDetailsCampaign = async (id: string) => {
  try {
    const res = await axiosJwt.get(`/campaigns/${id}`);
    return res.data
  } catch (error) {
    throw error;
  }
};
