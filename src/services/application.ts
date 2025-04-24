import { error } from "node:console";
import { axiosJwt } from "./user";

export const createApplication = async (id: string, data: FormData) => {
  try {
    const res = await axiosJwt.post(`jobs/${id}/apply`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const seenApllication = async (id: string) => {
  try {
    const res = await axiosJwt.patch(`applications/${id}/seen`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const shortlistApllication = async (id: string) => {
  try {
    const res = await axiosJwt.patch(`applications/${id}/shortlist`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const rejectApllication = async (id: string) => {
  try {
    const res = await axiosJwt.patch(`applications/${id}/reject`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const interViewApllication = async (id: string) => {
  try {
    const res = await axiosJwt.patch(`applications/${id}/interview`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const offerApllication = async (id: string) => {
  try {
    const res = await axiosJwt.patch(`applications/${id}/offer`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const hireApllication = async (id: string) => {
  try {
    const res = await axiosJwt.patch(`applications/${id}/hire`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getAppliedJobs = async (search: string, page: number) => {
  try {
    const res = await axiosJwt.get(`applications`, {
      params: {
        search,
        page,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
