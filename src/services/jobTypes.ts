import { sleep } from "@/lib/utils";
import { axiosJwt } from "./user";

export const getJobTypes = async (
  search: string | "",
  pageSize = 0,
  page = 1
) => {
  try {
    await sleep(500);
    const res = await axiosJwt.get("job-types", {
      params: {
        search: search,
        pageSize: pageSize,
        page: page,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getJobTypeById = async (id: string) => {
  try {
    const res = await axiosJwt.get(`job-types/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const createJobType = async (data: { name: string }) => {
  try {
    const res = await axiosJwt.post("job-types", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updateJobType = async (id: string, data: any) => {
  try {
    const res = await axiosJwt.patch(`job-types/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const deleteJobType = async (id: string) => {
  try {
    const res = await axiosJwt.delete(`job-types/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
