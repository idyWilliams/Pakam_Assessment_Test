"use client";
import Table from "@/components/Table";
import { useGetProduct as fetchData } from "@/service/hooks";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  //   const { data: productData } = (1, 10);

  const [data, setData] = useState<any[]>([]); // Adjust the data type according to your API response

  useEffect(() => {
    const page = 1; // Example: Page number
    const limit = 10; // Example: Limit

    // Call the API function
    fetchData(page, limit)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        // Handle the error, e.g., display an error message
        console.error(error);
      });
  }, []);
  console.log(data);
  return (
    <div className="grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[auto_1fr] min-h-screen h-auto md:h-screen md:min-h-0">
      <div className="transition-all md:w-72 lg:w-[180px] overflow-hidden flex flex-col bg-gradient-to-b from-[#008300] via-[#005700] to-[#005700]"></div>
      <div className="flex-auto h-full w-full bg-[#F7F7F4] overflow-y-hidden p-8 ">
        <div>
          <h1 className="text-[24px] leading-[38px] font-bold text-[#222D33]">
            Assessment
          </h1>
        </div>
        <div className="flex items-end justify-end">
          <button className="bg-[#005700] py-2 px-9 rounded-lg shadow-sm text-[#fff] active:scale-90 ease-in-out duration-75 ">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
