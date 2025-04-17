import { axiosJwt } from "./user";

export const BusinessVerify = async (data: FormData) => {
  try {
    const res = await axiosJwt.post("business/verifications", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
