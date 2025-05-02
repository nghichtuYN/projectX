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
export const updateFreelace = async (data: FormData) => {
  try {
    const res = await axiosJwt.patch(
      "freelance-recruiter/verifications",
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
export const getFreelanceRecruitment = async () => {
  try {
    const res = await axiosJwt.get("freelance-recruiter/verifications");
    return res.data;
  } catch (error) {
    throw error;
  }
};
