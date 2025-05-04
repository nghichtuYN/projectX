import { axiosJwt } from "./user";

export const createOrder = async (data: any) => {
  try {
    const res = await axiosJwt.post(`/x-token/top-up`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
