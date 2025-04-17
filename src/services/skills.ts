import { axiosJwt } from "./user";

export const getSkills = async (
  search: string | "",
  pageSize = 0,
  page = 1
) => {
  try {
    const res = await axiosJwt.get("skills", {
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
export const getSkillById = async (id: string) => {
  try {
    const res = await axiosJwt.get(`skills/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const createSkill = async (data: {
  name: string;
  description: string;
}) => {
  try {
    const res = await axiosJwt.post("skills", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updateSkill = async (id: string, data: any) => {
  try {
    console.log(data);
    const res = await axiosJwt.patch(`skills/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const deleteSkill = async (id: string) => {
  try {
    const res = await axiosJwt.delete(`skills/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
