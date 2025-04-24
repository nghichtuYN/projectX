import axiosInstance from "@/lib/axios";
import { axiosJwt } from "./user";

export const getPost = async (search: string, pageSize: number) => {
  try {
    const res = await axiosInstance.get("posts", {
      params: { search, pageSize },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getPostById = async (id: string) => {
  try {
    const res = await axiosInstance.get(`posts/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (data: FormData) => {
  try {
    const res = await axiosJwt.post("posts", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const deletePost = async (id: string) => {
  try {
    const res = await axiosJwt.post(`posts/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updatePost = async (id: string, data: any) => {
  try {
    const res = await axiosJwt.post(`posts/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const commentPost = async (id: string, data: FormData) => {
  try {
    const res = await axiosJwt.post(`posts/${id}/comments`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const likePost = async (id: string) => {
  try {
    const res = await axiosJwt.post(`posts/${id}/like`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const dislikePost = async (id: string) => {
  try {
    const res = await axiosJwt.post(`posts/${id}/dislike`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
