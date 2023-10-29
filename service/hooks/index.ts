import useQueryMutation from "@/utils/useQueryMutation";
import { BASEURL, api, makeGetRequest, makePostRequest } from "../api";
import useQueryAction from "@/utils/useQueryAction";
import axios from "axios";

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
      price?: number;
      quantity: number;
    }) => makePostRequest(data, api.products.createProduct),
  });
};

// export const useGetProduct = (page: number, limit: number) => {
//   return useQueryAction({
//     queryFn: () => makeGetRequest(api.products.getProducts(page, limit)),
//     queryKey: ["page"],
//   });
// };



interface APIResponse {

  data: any[];
}

export const useGetProduct = async (
  page: number,
  limit: number
): Promise<APIResponse> => {
  try {
    const response = await axios.get(
      `${BASEURL}/api/product/list?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data from the API");
  }
};
