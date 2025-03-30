import {
  useQuery,
  UseQueryOptions,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";

// Generic type TData cho dữ liệu trả về, TError cho lỗi (mặc định là Error)
export const useQueryHook = <TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">
) => {
  const query = useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });

  return query;
};