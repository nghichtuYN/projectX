import { axiosJwt } from "./user";

export const createPaymentURl = async (data: { orderId: string }) => {
  try {
    const res = await axiosJwt.post(`payments/vn-pay/create-payment-url`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
