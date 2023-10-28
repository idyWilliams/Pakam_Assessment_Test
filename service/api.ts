import axios from "axios";

export const BASEURL = process.env.NEXT_PUBLIC_BASEURL || "";

export const api = {
  users: {
    userLogin: "/api/user/login",
    userRegister: "/api/user/register",
  },
  products: {
    createProduct: "/api/product/create",
    getProducts: (page: number, limit: number) =>
      `/api/product/list?page=${page}&limit=${limit}`,
  },
};

export const makePostRequest = async (
  data: any,
  url: string,
  includeAuthHeader: boolean = true
) => {
  return await axios.post(`${BASEURL}${url}`, data, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken") as string,
    },
  });
};

export const makeGetRequest = async <T = any>(
  url: string,
  includeAuthHeaders: boolean = true
) => {
  const temp = await axios.get<T>(`${BASEURL}${url}`, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken") as string,
    },
  });
  return temp;
};
