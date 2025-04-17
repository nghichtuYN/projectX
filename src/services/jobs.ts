import { axiosJwt } from "./user";

export const createJob = async (formData: FormData) => {
  try {
    const response = await axiosJwt.post("/jobs", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Đảm bảo gửi dưới dạng FormData
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getJobById = async (id: string) => {
  try {
    const response = await axiosJwt.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateJob = async (id: string, formData: FormData) => {
  try {
    const response = await axiosJwt.patch(`/jobs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Đảm bảo gửi dưới dạng FormData
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteJob = async (id: string) => {
  try {
    const response = await axiosJwt.delete(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
