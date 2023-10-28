import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";

const useQueryMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
>(
  option: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const res = useMutation({
    ...option,
    onError: ({ response }) => {
      //@ts-ignore
      option.onError?.(response);
      try {
       
      } catch (e) {

      }
    },
    onSuccess: (response) => {
      //@ts-ignore
      option.onSuccess?.(response);
    },
  } as UseMutationOptions<unknown, unknown, unknown>) as UseMutationResult<
    TData,
    TError,
    TVariables
  >;

  return {
    ...res,
    //@ts-ignore
    result: res?.data?.data as TData["data"]["data"] | undefined,
    errorMessage:
      //@ts-ignore
      res?.error?.response?.data || res.error?.message,
  };
};
export default useQueryMutation;
