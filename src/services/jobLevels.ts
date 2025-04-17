import { axiosJwt } from "./user";

export const getLevels = async (
  search: string | "",
  pageSize = 0,
  page = 1
) => {
  try {
    const res = await axiosJwt.get("job-levels", {
      params: {
        search: search,
        pageSize: pageSize,
        page: page,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getLevelById = async (id: string) => {
  try {
    const res = await axiosJwt.get(`job-levels/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const createLevel = async (data: { name: string }) => {
  try {
    const res = await axiosJwt.post("job-levels", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updateLevel = async (id: string, data: any) => {
  try {
    const res = await axiosJwt.patch(`job-levels/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const deleteLevel = async (id: string) => {
  try {
    const res = await axiosJwt.delete(`job-levels/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
