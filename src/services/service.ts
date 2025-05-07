import { axiosJwt } from "./user";

export const getAllService = async () => {
  try {
    const res = await axiosJwt.get(`services`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
