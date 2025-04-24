import { axiosJwt } from "./user";

export const creatFreelanceRecruitment = async (data: FormData) => {
  try {
    const res = await axiosJwt.post("freelance-recruiter/verifications", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
