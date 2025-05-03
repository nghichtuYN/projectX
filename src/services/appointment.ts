import { axiosJwt } from "./user";

export const createAppointment = async (data: any) => {
  try {
    const res = await axiosJwt.post(`appointments`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getAppointments = async (
  search: string = "",
  page: number,
  thisWeek: string = "all",
  pageSize: number = 10
) => {
  try {
    const params = new URLSearchParams();
    params.append("search", search);
    params.append("page", page.toString());
    params.append("pageSize", pageSize.toString());
    if (thisWeek !== "all") {
      params.append("thisWeek", thisWeek);
    }

    const res = await axiosJwt.get(`appointments?${params.toString()}`);
    return res.data;
  } catch (error: any) {
    // Cung cấp thông tin lỗi chi tiết
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Lỗi khi lấy danh sách cuộc hẹn"
    );
  }
};
export const getAppointmentById = async (id: string) => {
  try {
    const res = await axiosJwt.get(`appointments/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
