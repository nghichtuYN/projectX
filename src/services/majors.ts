import { axiosJwt } from "./user";

export const getMajor = async (search: string | "", pageSize = 0, page = 1) => {
  try {
    const res = await axiosJwt.get("/majors", {
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
export const getMajorById = async (id: string) => {
  try {
    const res = await axiosJwt.get(`/majors/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export const createMajor = async (data: { name: string }) => {
  try {
    const res = await axiosJwt.post("/majors", data);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export const updateMajor = async (id: string, data: any) => {
  try {
    const res = await axiosJwt.patch(`/majors/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export const deleteMajor = async (id: string) => {
  try {
    const res = await axiosJwt.delete(`/majors/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}