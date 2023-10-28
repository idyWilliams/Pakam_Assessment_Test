import useQueryMutation from "@/utils/useQueryMutation";
import { api, makeGetRequest, makePostRequest } from "../api";
import useQueryAction from "@/utils/useQueryAction";

//users
export const useUserLogin = () => {
  return useQueryMutation({
    mutationFn: (data: { username: string; password: string }) =>
      makePostRequest(data, api.users.userLogin),
  });
};

export const useRegister = () => {
  return useQueryMutation({
    mutationFn: (data: {
      firstName: string;
      lastName: string;
      username: string;
      password: string;
    }) => makePostRequest(data, api.users.userRegister),
  });
};

//Product

export const useCreateProduct = () => {
  return useQueryMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      price: number;
      quantity: number;
    }) => makePostRequest(data, api.products.createProduct),
  });
};

export const useGetProduct = (page: number, limit: number) => {
  return useQueryAction({
    queryFn: () => makeGetRequest(api.products.getProducts(page, limit)),
    queryKey: ["xcxvxcvxcv"],
  });
};
