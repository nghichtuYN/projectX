import { axiosJwt } from "./user";

export const sendMessages = async (data: FormData) => {
  try {
    const res = await axiosJwt.post("/messages", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const markAsReadMessage = async (id: string) => {
  try {
    const res = await axiosJwt.patch(`/messages/${id}/mark-as-read`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
