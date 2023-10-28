"use client";
import { useGetProduct } from "@/service/hooks";
import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { Column } from "react-table";
interface IProduct {
  description: string;
  name: string;
  price: number;
  quantity?: number;
  __v: number;
  _id: string;
}

const Table = (productData: IProduct[]) => {


  const data = useMemo(() => productData || [], [productData]);
  const dColumns: readonly Column<IProduct>[] = [
    {
      Header: "NAME",
      accessor: "name",
      Cell: ({ value }) => (
        <div className="text-center">
          <strong>{value}</strong>
        </div>
      ),
    },
    {
      Header: "DESCRIPTION",
      accessor: "description",
      Cell: ({ value }) => <div className="text-left">{value}</div>,
    },
    {
      Header: "QUANTITY",
      accessor: "quantity",
      Cell: ({ value }) => <div className="text-center">{value}</div>,
    },
  ];

  const columns = useMemo(() => dColumns, []);
  const table = useTable(
    {
      columns,
      data: [],
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  ) as any;

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    page,
    state,
    setGlobalFilter,
    prepareRow,
    nextPage,
    gotoPage,
    pageCount,
    setPageSize,
    previousPage,
    pageOptions,
    canNextPage,
    canPreviousPage,
    footerGroups,
  } = table;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div className="overflow-x-auto xxs:hidden md:block">
      <table
        {...getTableProps()}
        className="appearance-none bg-white min-w-full  mb-6 "
        id="my-table"
      >
        <thead className="bg-[#fff] appearance-none">
          {headerGroups.map(
            (headerGroup: {
              getHeaderGroupProps: () => {
                [x: string]: any;
                key: any;
              };
              headers: any[];
            }) => {
              const { key, ...restHeaderProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...restHeaderProps}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="font-normal text-sm text-primary py-4 text-left whitespace-nowrap px-4 border-r border-slate-50"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                    >
                      <div className="flex items-center">
                        <span className="text-[#5C6F7F] font-bold text-sm">
                          {column.render("Header")}
                        </span>

                        {column.canSort === true && (
                          <span className="ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="12"
                              viewBox="0 0 10 18"
                              fill="none"
                            >
                              <path
                                d="M5.00016 2.83L8.17016 6L9.58016 4.59L5.00016 0L0.410156 4.59L1.83016 6L5.00016 2.83ZM5.00016 15.17L1.83016 12L0.420156 13.41L5.00016 18L9.59016 13.41L8.17016 12L5.00016 15.17Z"
                                fill="#323232"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              );
            }
          )}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="mt-3 pt-3 w-full space-y-8 border-r border-slate-50"
        >
          {page.map(
            (
              rowIndex: React.Key | null | undefined,
              row: {
                getRowProps: () => JSX.IntrinsicAttributes &
                  React.ClassAttributes<HTMLTableRowElement> &
                  React.HTMLAttributes<HTMLTableRowElement>;
                cells: any[];
              }
            ) => {
              prepareRow(row);
              return (
                <tr
                  key={rowIndex}
                  {...row.getRowProps()}
                  className="appearance-none my-4 border border-slate-50 even:bg-white odd:bg-slate-100"
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        className="font-normal text-sm text-[#202223] py-4 px-4 border-r border-slate-50 text-left"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
