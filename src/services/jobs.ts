import axiosInstance from "@/lib/axios";
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
export const getJobs = async (
  search: string = "",
  companyName?: string | null,
  jobLevels?: string[],
  jobTypes?: string[],
  contractTypes?: string[],
  majors?: string[],
  locations?: string[],
  minSalary?: number | string,
  maxSalary?: number | string,
  minExp?: number | string,
  maxExp?: number | string,
  pageSize?: number
) => {
  try {
    const params = new URLSearchParams();

    if (search) {
      params.append("search", search);
    }
    if (companyName) {
      params.append("companyName", companyName);
    }

    if (locations)
      locations.forEach((location) => {
        params.append("locations", location);
      });

    if (jobLevels)
      jobLevels.forEach((level) => params.append("jobLevels", level));
    if (jobTypes) jobTypes.forEach((type) => params.append("jobTypes", type));
    if (contractTypes)
      contractTypes.forEach((type) => params.append("contractTypes", type));
    if (majors) majors.forEach((major) => params.append("majors", major));

    if (minSalary !== undefined) {
      params.append("minSalary", minSalary.toString());
    }
    if (maxSalary !== undefined) {
      params.append("maxSalary", maxSalary.toString());
    }
    if (minExp !== undefined) {
      params.append("minExp", minExp.toString());
    }
    if (maxExp !== undefined) {
      params.append("maxExp", maxExp.toString());
    }
    if (pageSize) params.append("pageSize", pageSize.toString());
    const queryString = params.toString();
    const response = await axiosInstance.get(`/jobs?${queryString}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const saveJob = async (id: string) => {
  try {
    const response = await axiosJwt.post(`/jobs/${id}/save`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const unsaveJob = async (id: string) => {
  try {
    const response = await axiosJwt.delete(`/jobs/${id}/un-save`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getJobSaved = async (
  search: string,
  page: number,
  pageSize = 10
) => {
  try {
    const response = await axiosJwt.get(`/jobs/saved`, {
      params: {
        search,
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDetailJobByCampaignId = async (id: string, jobId: string) => {
  try {
    const response = await axiosJwt.get(`/campaigns/${id}/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
