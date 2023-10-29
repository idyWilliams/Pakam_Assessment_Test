"use client";
import { IProduct } from "@/app/dashboard/page";
import React, {

  HTMLProps,
  useReducer,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { IoMdRefresh } from "react-icons/io";

interface TableProps {
  productData: IProduct[];
}

const ProductTable: React.FC<TableProps> = ({ productData }) => {
  const rerender = useReducer(() => ({}), {})[1];
  const columns = React.useMemo<ColumnDef<IProduct>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ table }) => (
          <>
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />{" "}
            Name
          </>
        ),
        cell: ({ row, getValue }) => (
          <div

          >
            <div className="flex items-center gap-2">
              <IndeterminateCheckbox
                {...{
                  checked: row.getIsSelected(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
              />{" "}
              {getValue() as ReactNode}
            </div>
          </div>
        ),
      },
      {
        accessorFn: (row) => row.description,
        id: "description",
        cell: (info) => info.getValue(),
        header: () => <span>Description</span>,
      },

      {
        accessorKey: "quantity",
        header: () => <span>Quantity</span>,
      },
    ],
    []
  );

  const [data, setData] = useState<IProduct[]>([]);
  const refreshData = () => setData(productData);


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });
  useEffect(() => {
    setData(productData);
  }, [productData]);
  return (
    <div className="overflow-x-auto xxs:hidden md:block">
      <div
        onClick={refreshData}
        className="w-full flex items-center justify-between bg-[#fff] h-10 rounded-t-md px-4 mt-10 border-slate-200 border-b"
      >
        <div className="flex items-center gap-1 text-[16px] leading-[28px] text-[#464F54] cursor-pointer">
          <IoMdRefresh size={23} className="-rotate-180" />
          Refresh
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            0{table.getState().pagination.pageIndex + 1} of 0
            {table.getPageCount()}
          </span>
          <div className="flex items-center gap-3">
            <button
              className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 cursor-pointer"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className=" w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 cursor-pointer"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
          </div>
        </div>
       
      </div>
      <table
        className="appearance-none bg-white min-w-full  rounded-md"
        id="my-table"
      >
        <thead className="bg-[#fff] appearance-none">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className="font-normal text-sm text-primary py-3 text-left whitespace-nowrap px-4 border-r border-slate-50"
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2 text-[16px] leading-[24.4px] text-[#222D33]">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody className="mt-3 pt-3 w-full space-y-8 border-b border-slate-200">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                className="appearance-none my-4 border-t border-slate-200 "
                key={row.id}
              >

                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="font-normal text-sm text-[#202223] py-4 px-4 text-left"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer h-5 w-5"}
      {...rest}
    />
  );
}
