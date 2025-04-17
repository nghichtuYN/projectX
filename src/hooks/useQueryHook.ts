import {
  useQuery,
  UseQueryOptions,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";

export const useQueryHook = <TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TData>,
  options?: any
) => {
  const query = useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });

  return query;
};
