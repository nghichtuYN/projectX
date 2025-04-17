import { sleep } from "@/lib/utils";
import { axiosJwt } from "./user";

export const getContractType = async (
  search: string | "",
  pageSize = 0,
  page = 1
) => {
  try {
    await sleep(500);
    const res = await axiosJwt.get("contract-types", {
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
export const getContractTypeById = async (id: string) => {
  try {
    const res = await axiosJwt.get(`contract-types/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const createContractType = async (data: { name: string }) => {
  try {
    const res = await axiosJwt.post("contract-types", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updateContractType = async (id: string, data: any) => {
  try {
    const res = await axiosJwt.patch(`contract-types/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const deleteContractType = async (id: string) => {
  try {
    const res = await axiosJwt.delete(`contract-types/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
