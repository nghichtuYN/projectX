import { axiosJwt } from "./user";

export const createPaymentURT = async (data: { orderId: string }) => {
  try {
    const res = await axiosJwt.post(`payments/vn-pay/create-payment-url`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
