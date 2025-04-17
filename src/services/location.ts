import { axiosJwt } from "./user";

export const getAllLocation = async (search: string | "") => {
  try {
    const res = await axiosJwt.get("/locations", {
      params: {
        search: search,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getLocationById = async (id: string) => { 
  try {
    const res = await axiosJwt.get(`/locations/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export const createLocation = async (data: { name: string }) => {
  try {
    const res = await axiosJwt.post("/locations", data);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export const updateLocation = async (id: string, data: any) => {
  try {
    const res = await axiosJwt.patch(`/locations/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
}
export const deleteLocation = async (id: string) => {
  try {
    const res = await axiosJwt.delete(`/locations/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}
