import axiosInstance from "@/lib/axios";
import { axiosJwt } from "./user";

export const getAllCampaigns = async (searchValue: string, page: number) => {
  const res = await axiosJwt.get("/campaigns", {
    params: {
      search: searchValue,
      page: page,
    },
  });
  return res.data;
};
export const createCampaign = async (data: any) => {
  try {
    const res = await axiosJwt.post("/campaigns", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getDetailsCampaign = async (id: string) => {
  try {
    const res = await axiosJwt.get(`/campaigns/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCampaign = async (id: string, data: any) => {
  try {
    const res = await axiosJwt.patch(`/campaigns/${id}`, data);
    return res.data;
  } catch (error) {
    throw error; // Ném lỗi để useMutationHook xử lý
  }
};
export const getJobByCampaignId = async (
  id: string,
  search: string,
  page: number
) => {
  const res = await axiosJwt.get(`/campaigns/${id}/jobs`, {
    params: {
      search: search,
      page: page,
    },
  });
  return res.data;
};
