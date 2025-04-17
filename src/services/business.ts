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
export const updateBusiness = async (id: string, data: FormData) => {
  try {
    const res = await axiosJwt.patch(
      `admin/business-verifications/${id}/accept`,
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
