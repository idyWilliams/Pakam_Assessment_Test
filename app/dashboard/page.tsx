import Table from "@/components/Table";
import React from "react";

const Dashboard = () => {
    
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
          <button className="bg-[#005700] py-2 px-9 rounded-lg shadow-sm text-[#fff] active:scale-90 ease-in-out duration-75 ">Create</button>
        </div>
          </div>
          <div>
              <Table/>
          </div>
    </div>
  );
};

export default Dashboard;
