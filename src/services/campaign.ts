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

export const getAppLicationByCampaignId = async (
  id: string,
  search: string,
  page: number,
  seen: string,
  progess?: string,
) => {
  try {
    const params = new URLSearchParams();
    if (search) {
      params.append("search", search);
    }
    if (page) {
      params.append("page", page.toString());
    }
    if (seen !== "all") {
      if (seen === "appointment_true") params.append("appointment", "true");
      else if (seen === "appointment_false")
        params.append("appointment", "false");
      else params.append("seen", seen.toString());
    }
    if (progess !== "all" && progess !== undefined) {
      params.append("process", progess.toString());
    }
    const queryString = params.toString();
    const res = await axiosJwt.get(
      `/campaigns/${id}/applications?${queryString}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
