import { axiosJwt } from "./user";

export const getAllLocation = async (search: string | "") => {
  const res = await axiosJwt.get("/locations", {
    params: {
      search: search,
    },
  });
  return res.data;
};
