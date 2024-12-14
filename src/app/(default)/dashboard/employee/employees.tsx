'use client';

import { SelectedItemsProvider } from '@/app/selected-items-context';
import DeleteButton from '@/components/delete-button';
import { useState } from 'react';
import ProductsPagination from '@/components/products/pagination';
import EmployeesTable from './employees-table';
import useEmployees from '@/hooks/useEmployees';
import CreateEmployeeModal from './create-modal';
import FilterEmployees from './filter-drawer';

const LIMIT_PER_PAGE = 10;
function EmployeesContent() {
  const [filterParams, setFilterParams] = useState<any>({
    limit: LIMIT_PER_PAGE,
    skip: 0,
    forceRefresh: 0,
  });

  const employeesData = useEmployees(filterParams);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const handleEmployeeModified = () => {
    setFilterParams((prev: any) => ({
      ...prev,
      forceRefresh: prev.forceRefresh + 1,
    }));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="mb-8 sm:flex sm:justify-between sm:items-center">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">
            Employees
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
          {/* Delete button */}
          <DeleteButton />

          <div className="flex items-center gap-2">
            <FilterEmployees
              filterParams={filterParams}
              setFilterParams={setFilterParams}
            />
            <div>
              <div className="relative">
                <input
                  id="form-search"
                  className="w-full form-input pl-9"
                  type="search"
                  placeholder="Search name, email..."
                  onChange={(e) =>
                    setFilterParams({ ...filterParams, email: e.target.value })
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
            </div>
            <div className="m-1.5">
              {/* Start */}
              <button
                className="text-gray-100 bg-gray-900 btn hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                onClick={() => setCreateModalOpen(true)}
              >
                Add Employee
              </button>
              {/* End */}
            </div>
          </div>
        </div>
      </div>

      <EmployeesTable
        employees={employeesData?.data}
        total={employeesData?.total}
      />

      <div className="mt-8">
        <ProductsPagination
          filterParams={filterParams}
          setFilterParams={setFilterParams}
          data={{
            limit: employeesData?.$limit,
            skip: employeesData?.$skip,
            total: employeesData?.total,
          }}
        />
      </div>
      <CreateEmployeeModal
        open={isCreateModalOpen}
        onOpen={setCreateModalOpen}
        onEmployeeCreated={handleEmployeeModified}
      />
    </div>
  );
}

export default function Employees() {
  return (
    <SelectedItemsProvider>
      <EmployeesContent />
    </SelectedItemsProvider>
  );
}
