import { axiosJwt } from "./user";

export const getMajor = async (search: string | "") => {
  const res = await axiosJwt.get("/majors", {
    params: {
      search: search,
    },
  });
  return res.data;
};
