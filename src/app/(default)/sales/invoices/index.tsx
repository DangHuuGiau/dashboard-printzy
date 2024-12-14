'use client';

import { SelectedItemsProvider } from '@/app/selected-items-context';
import InvoicesTable from './invoices-table';
import ProductsPagination from '../../../../components/products/pagination';
import { useState } from 'react';
import useInvoices from '@/hooks/useInvoices';
import Datepicker from '@/components/datepicker';

const LIMIT_PER_PAGE = 10;
function InvoicesContent() {
  const [dates, setDates] = useState<[Date | null, Date | null]>([
    new Date(new Date().setDate(new Date().getDate() - 7)), // 7 days before today
    new Date(),
  ]);
  const [filterParams, setFilterParams] = useState<any>({
    limit: LIMIT_PER_PAGE,
    skip: 0,
    forceRefresh: 0,
  });
  const [activeStatus, setActiveStatus] = useState<string>('');

  const invoicesData = useInvoices({
    ...filterParams,
    status: activeStatus === 'All' ? '' : activeStatus,
    startDate: dates[0],
    endDate: dates[1],
  });

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    setFilterParams({ ...filterParams, skip: 0 });
  };

  const handleModified = () => {
    setFilterParams((prev: any) => ({
      ...prev,
      forceRefresh: prev.forceRefresh + 1,
    }));
  };

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

          <div className="relative">
            <input
              id="form-search"
              className="w-full form-input pl-9"
              type="search"
              placeholder="Search invoice, order number..."
              onChange={(e) =>
                setFilterParams({ ...filterParams, keyword: e.target.value })
              }
            />
            <button
              className="absolute inset-0 right-auto group"
              type="submit"
              aria-label="Search"
            >
              <svg
                className="ml-3 mr-2 text-gray-400 fill-current shrink-0 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </div>

          <Datepicker
            align="right"
            onDateChange={(selectedDates: Date[]) => {
              setDates([selectedDates[0], selectedDates[1] || null]);
            }}
          />
          {/* Create invoice button */}
          {/* <button className="text-gray-100 bg-gray-900 btn hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">Create Invoice</span>
          </button> */}
        </div>
      </div>

      {/* More actions */}
      <div className="mb-5 sm:flex sm:justify-between sm:items-center">
        <div className="mb-4 sm:mb-0">
          <ul className="flex flex-wrap -m-1">
            {['All', 'Completed', 'Pending', 'Failed', 'Refunded'].map(
              (status) => (
                <li key={status} className="m-1">
                  <button
                    onClick={() => handleStatusChange(status)}
                    className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium leading-5 transition rounded-full shadow-sm ${
                      activeStatus === status
                        ? 'text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-800'
                        : 'text-gray-500 bg-white border border-gray-200 hover:border-gray-300 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600'
                    }`}
                  >
                    {status}{' '}
                    {/* <span className="ml-1 text-gray-400 dark:text-gray-500">
                      {status === 'All'
                        ? invoicesData?.total
                        : invoicesData?.data.filter(
                            (item: any) => item.status === status
                          ).length || 0}
                    </span> */}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Table */}
      <InvoicesTable
        invoices={invoicesData?.data}
        total={invoicesData?.total}
        onModified={handleModified}
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
