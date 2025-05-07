import { axiosJwt } from "./user";

export const createOrder = async (data: any) => {
  try {
    const res = await axiosJwt.post(`/x-token/top-up`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getOrderById = async (id: string) => {
  try {
    const res = await axiosJwt.get(`/orders/top-up/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getOrderIdJob = async (id: string) => {
  try {
    const res = await axiosJwt.get(`/orders/job/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getOrderIdBusiness = async (id: string) => {
  try {
    const res = await axiosJwt.get(`/orders/business/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
