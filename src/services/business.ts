import { axiosJwt } from "./user";

export const updateBusiness = async (id: string, data: FormData) => {
  try {
    const res = await axiosJwt.patch(
      `admin/business-verifications/${id}/accept`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getBusinessInfo = async () => {
  try {
    const res = await axiosJwt.get(`business/verifications`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
