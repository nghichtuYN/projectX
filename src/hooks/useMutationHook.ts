import { MutateFunction, useMutation } from "@tanstack/react-query";

export const useMutationHook = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
>(
  fnCallBack: MutateFunction<TData, TError, TVariables, TContext>,
  fnSuccess: (data: TData) => void,
  fnError?: (error: TError) => void,
  fnSettled?: (data: TData | undefined, error: TError | null) => void
) => {
  const mutation = useMutation<TData, TError, TVariables, TContext>({
    mutationFn: fnCallBack,
    onSuccess: fnSuccess,
    onError: fnError,
    onSettled: fnSettled,
  });
  return mutation;
};