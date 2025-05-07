import { axiosJwt } from "./user";

export const getBusiness = async (
  search: string,
  page: number,
  unverified?: string,
  pageSize?: 10
) => {
  console.log(unverified);
  try {
    const res = await axiosJwt.get("admin/business-verifications", {
      params: {
        search: search,
        page: page,
        pageSize: pageSize,
        status: unverified,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const acceptBusiness = async (id: string) => {
  try {
    const res = await axiosJwt.patch(
      `admin/business-verifications/${id}/accept`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const rejectBusiness = async (
  id: string,
  data: { rejectReason: string }
) => {
  try {
    const res = await axiosJwt.patch(
      `admin/business-verifications/${id}/reject`,
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getFreelance = async (
  search: string,
  page: number,
  unverified?: string,
  pageSize?: 10
) => {
  try {
    const res = await axiosJwt.get("admin/freelance-recruiter-verifications", {
      params: {
        search: search,
        page: page,
        pageSize: pageSize,
        status: unverified,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const acceptFreelance = async (id: string) => {
  try {
    const res = await axiosJwt.patch(
      `admin/freelance-recruiter-verifications/${id}/accept`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const rejectFreelance = async (
  id: string,
  data: { rejectReason: string }
) => {
  try {
    const res = await axiosJwt.patch(
      `admin/freelance-recruiter-verifications/${id}/reject`,
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getAdminJobs = async (
  search: string,
  page: number,
  pageSize: number
) => {
  try {
    const res = await axiosJwt.get("admin/jobs", {
      params: {
        search: search,
        page: page,
        pageSize: pageSize,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const acceptJobs = async (id: string) => {
  try {
    const res = await axiosJwt.patch(`admin/jobs/${id}/accept`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const rejectJobs = async (
  id: string,
  data: { rejectReason: string }
) => {
  try {
    const res = await axiosJwt.patch(`admin/jobs/${id}/reject`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
