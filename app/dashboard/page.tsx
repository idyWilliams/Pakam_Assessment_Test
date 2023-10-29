"use client";
import ProductTable from "@/components/Table";
import { useGetProduct as fetchData, useCreateProduct } from "@/service/hooks";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdClose } from "react-icons/io";

export type IProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  __v: number;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  quantity: yup.number().required("Quantity is required"),
});

interface ICreate {
  name: string;
  description: string;
  quantity: number;
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const create = useCreateProduct();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const page = 1;
    const limit = 100;
    fetchData(page, limit)
      .then((response) => {
        setProductData(response.data);
        setProductData((prevProducts) =>
          [...prevProducts].sort((a, b) => (a._id > b._id ? -1 : 1))
        );
      })
      .catch((error) => {
      });
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreate>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ICreate> = (data) => {
    setLoading(true);
    create
      .mutateAsync(data)
      .then((res) => {
        setProductData([res.data.data, ...productData]);
        setProductData((prevProducts) =>
          [...prevProducts].sort((a, b) => (a._id > b._id ? -1 : 1))
        );
        setLoading(false);
        reset();
        closeModal();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[auto_1fr] min-h-screen h-auto md:h-screen md:min-h-0">
        <div className="transition-all md:w-72 lg:w-[180px] overflow-hidden flex flex-col bg-gradient-to-b from-[#008300] via-[#005700] to-[#005700]"></div>
        <div className="flex-auto h-full w-full bg-[#F7F7F4] overflow-y-auto p-8 ">
          <div>
            <h1 className="text-[24px] leading-[38px] font-bold text-[#222D33]">
              Assessment
            </h1>
          </div>
          <div className="flex items-end justify-end">
            <button
              onClick={openModal}
              className="bg-[#005700] py-2 px-9 rounded-lg shadow-sm text-[#fff] active:scale-90 ease-in-out duration-75 "
            >
              Create
            </button>
          </div>
          <div className="h-full">
            {productData.length < 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <svg
                  className="animate-spin h-20 w-20 mr-3 text-[#005700]"
                  width="54px"
                  height="54px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.2"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="#005700"
                  />
                  <path
                    d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                    fill="#005700"
                  />
                </svg>
                <p className="text-center text-[#295011] text-[16px] leading-[28px] font-normal">
                  fetching product data...
                </p>
              </div>
            ) : (
              <div>
                <ProductTable productData={productData} />
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div
              onClick={closeModal}
              className="absolute top-0 left-0 w-full h-full bg-black opacity-70 backdrop-blur-2xl"
            ></div>

            <div className="bg-white w-[780px] p-6 rounded-lg shadow-lg z-50">
              <div className="w-full flex  justify-between">
                <h2 className="text-2xl font-semibold mb-4 text-[#222D33]">
                  Create Assessment
                </h2>
                <span onClick={closeModal} className="cursor-pointer">
                  <IoMdClose size={23} />
                </span>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full  mt-10 "
              >
                <div className="flex w-full gap-[40px]">
                  <div className="w-[50%]">
                    <div className="mb-4">
                      <label
                        htmlFor={"name"}
                        className="block font-medium mb-1 text-[14px] leading-[22px] text-[#222D33]"
                      >
                        Full Name
                      </label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter Name"
                            className={`w-full p-2 rounded border ${
                              errors.name ? "border-[#a10]" : "border-[#005700]"
                            } focus:border-[#005700] focus:outline-none placeholder:text-[16px] placeholder:leading-[28px] text-[#222D33] placeholder:font-normal placeholder:text-[#C2C2C2]`}
                          />
                        )}
                      />
                      <p className="text-[#a10]">{errors.name?.message}</p>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor={"quantity"}
                        className="block font-medium mb-1 text-[14px] leading-[22px] text-[#222D33]"
                      >
                        Quantity
                      </label>
                      <Controller
                        name="quantity"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            placeholder="Quantity"
                            className={`w-full p-2 rounded border ${
                              errors.quantity
                                ? "border-[#a10]"
                                : "border-[#005700]"
                            } focus:border-[#005700] focus:outline-none placeholder:text-[16px] placeholder:leading-[28px] text-[#222D33] placeholder:font-normal placeholder:text-[#C2C2C2]`}
                          />
                        )}
                      />
                      <p className="text-[#a10]">{errors.quantity?.message}</p>
                    </div>
                  </div>

                  <div className="mb-4 w-[50%]">
                    <div className="">
                      <label
                        htmlFor={"description"}
                        className="block font-medium mb-1 text-[14px] leading-[22px] text-[#222D33]"
                      >
                        Description
                      </label>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Description"
                            className={`w-full p-2 rounded border ${
                              errors.description
                                ? "border-[#a10]"
                                : "border-[#005700]"
                            } focus:border-[#005700] focus:outline-none placeholder:text-[16px] placeholder:leading-[28px] text-[#222D33] placeholder:font-normal placeholder:text-[#C2C2C2]`}
                          />
                        )}
                      />
                      <p className="text-[#a10]">
                        {errors.description?.message}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="bg-gradient-to-r from-[#008300] via-[#005700] to-[#005700]  my-10      text-white text-[14px] leading-[24px] py-2 px-10 rounded-md shadow-md"
                  type="submit"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-7 w-7 mr-3 text-white"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="white"
                      />
                      <path
                        d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
