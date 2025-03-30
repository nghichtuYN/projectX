import { axiosJwt } from "./user";

export const getLevels = async (
  search: string | "",
  pageSize = 0,
  page = 1
) => {
  const res = await axiosJwt.get("job-levels", {
    params: {
      search: search,
      pageSize: pageSize,
      page: page,
    },
  });
  return res.data;
};
