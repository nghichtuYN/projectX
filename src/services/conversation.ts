import { axiosJwt } from "./user";

export const getConversation = async (
  search: string,
  page: number,
  pageSize = 0
) => {
  try {
    const res = await axiosJwt.get(`conversations`, {
      params: { search, page, pageSize },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getConversationById = async (id: string) => {
  try {
    const res = await axiosJwt.get(`conversations/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
