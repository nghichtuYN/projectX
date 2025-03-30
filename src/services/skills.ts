import { axiosJwt } from "./user";

export const getSkills = async (
  search: string | "",
  pageSize = 0,
  page = 1
) => {
  const res = await axiosJwt.get("skills", {
    params: {
      search: search,
      pageSize: pageSize,
      page: page,
    },
  });
  return res.data;
};
