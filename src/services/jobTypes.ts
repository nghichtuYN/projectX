import { axiosJwt } from "./user";

export const getJobTypes = async (
  search: string | "",
  pageSize = 0,
  page = 1
) => {
  const res = await axiosJwt.get("job-types", {
    params: {
      search: search,
      pageSize: pageSize,
      page: page,
    },
  });
  return res.data;
};
