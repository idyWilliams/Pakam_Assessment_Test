import { QueryObserverResult, UseQueryOptions, useQuery } from "@tanstack/react-query";

const useQueryAction = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  queries: UseQueryOptions<TQueryFnData, TError, TData>
) => {
  const res = useQuery({
    retry: false,
    refetchOnWindowFocus: false,
    ...queries,
    queryKey: queries.queryKey || [queries],
    onError: (e: any) => {
      // console.log(e)
      return e;
    },
  } as UseQueryOptions<unknown, unknown, unknown>) as QueryObserverResult<
    TQueryFnData,
    TError
  >;
  return {
    ...res,
    //@ts-ignore
    result: res?.data,
  };
};
export default useQueryAction;
