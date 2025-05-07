import { axiosJwt } from "./user";

export const createPaymentVNPayURl = async (data: { orderId: string }) => {
  try {
    const res = await axiosJwt.post(`payments/vn-pay/create-payment-url`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const createPaymentSePayURl = async (data: { orderId: string }) => {
  try {
    const res = await axiosJwt.post(`payments/se-pay/create-payment-qr`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
