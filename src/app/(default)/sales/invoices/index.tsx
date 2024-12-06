"use client";

import { SelectedItemsProvider } from "@/app/selected-items-context";
import SearchForm from "@/components/search-form";
import DeleteButton from "@/components/delete-button";
import DateSelect from "@/components/date-select";
import InvoicesTable from "./invoices-table";
import ProductsPagination from "../../../../components/products/pagination";
import { useState } from "react";
import useInvoices from "@/hooks/useInvoices";

const LIMIT_PER_PAGE = 10;
function InvoicesContent() {
  const [filterParams, setFilterParams] = useState<any>({
    limit: LIMIT_PER_PAGE,
    skip: 0,
  });

  const invoicesData = useInvoices(filterParams);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="mb-5 sm:flex sm:justify-between sm:items-center">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">
            Invoices
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
          {/* Search form */}
          <SearchForm placeholder="Search by invoice ID…" />
          <DateSelect />
          {/* Create invoice button */}
          <button className="text-gray-100 bg-gray-900 btn hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Create Invoice</span>
          </button>
        </div>
      </div>

      {/* More actions */}
      <div className="mb-5 sm:flex sm:justify-between sm:items-center">
        {/* Left side */}
        <div className="mb-4 sm:mb-0">
          <ul className="flex flex-wrap -m-1">
            <li className="m-1">
              <button className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 text-white transition bg-gray-900 border border-transparent rounded-full shadow-sm dark:bg-gray-100 dark:text-gray-800">
                All{" "}
                <span className="ml-1 text-gray-400 dark:text-gray-500">
                  {invoicesData?.total}
                </span>
              </button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 text-gray-500 transition bg-white border border-gray-200 rounded-full shadow-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                Paid{" "}
                <span className="ml-1 text-gray-400 dark:text-gray-500">
                  {invoicesData?.total}
                </span>
              </button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 text-gray-500 transition bg-white border border-gray-200 rounded-full shadow-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                Waiting{" "}
                <span className="ml-1 text-gray-400 dark:text-gray-500">0</span>
              </button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 text-gray-500 transition bg-white border border-gray-200 rounded-full shadow-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
                Overdue{" "}
                <span className="ml-1 text-gray-400 dark:text-gray-500">0</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
          <DeleteButton />
        </div>
      </div>

      {/* Table */}
      <InvoicesTable
        invoices={invoicesData?.data}
        total={invoicesData?.total}
      />

      {/* Pagination */}
      <div className="mt-8">
        <ProductsPagination
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          data={{
            limit: invoicesData?.$limit,
            skip: invoicesData?.$skip,
            total: invoicesData?.total,
          }}
        />
      </div>
    </div>
  );
}

export default function Invoices() {
  return (
    <SelectedItemsProvider>
      <InvoicesContent />
    </SelectedItemsProvider>
  );
}
