'use client';

import { SelectedItemsProvider } from '@/app/selected-items-context';
import DeleteButton from '@/components/delete-button';
import OrdersTable from './orders-table';

import { useState } from 'react';
import useOrders from '@/hooks/useOrders';
import ProductsPagination from '../../../../components/products/pagination';
import Datepicker from '@/components/datepicker';
import FilterDrawer from './filter-drawer';

const LIMIT_PER_PAGE = 10;
function OrdersContent() {
  const [filterParams, setFilterParams] = useState<any>({
    limit: LIMIT_PER_PAGE,
    skip: 0,
  });
  const [activeStatus, setActiveStatus] = useState<string>('');
  const [dates, setDates] = useState<[Date | null, Date | null]>([
    new Date(new Date().setDate(new Date().getDate() - 7)), // 7 days before today
    new Date(),
  ]);

  const ordersData = useOrders({
    ...filterParams,
    status: activeStatus === 'All' ? '' : activeStatus.toLowerCase(),
    startDate: dates[0],
    endDate: dates[1],
  });
  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    setFilterParams({ ...filterParams, skip: 0 });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="mb-8 sm:flex sm:justify-between sm:items-center">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">
            Orders
          </h1>
        </div>

        <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
          <DeleteButton />

          <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
            <Datepicker
              align="right"
              onDateChange={(selectedDates: Date[]) => {
                setDates([selectedDates[0], selectedDates[1] || null]);
              }}
            />
            <FilterDrawer
              filterParams={filterParams}
              setFilterParams={setFilterParams}
            />
          </div>
        </div>
      </div>

      <div className="mb-5 sm:flex sm:justify-between sm:items-center">
        <div className="mb-4 sm:mb-0">
          <ul className="flex flex-wrap -m-1">
            {[
              'All',
              'Unpaid',
              'Processing',
              'Delivery',
              'Completed',
              'Cancelled',
              'Refunded',
            ].map((status) => (
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
            ))}
          </ul>
        </div>
      </div>

      <OrdersTable orders={ordersData?.data} total={ordersData?.total} />

      <div className="mt-8">
        <ProductsPagination
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          data={{
            limit: ordersData?.$limit,
            skip: ordersData?.$skip,
            total: ordersData?.total,
          }}
        />
      </div>
    </div>
  );
}

export default function Orders() {
  return (
    <SelectedItemsProvider>
      <OrdersContent />
    </SelectedItemsProvider>
  );
}
