'use client';

import { SelectedItemsProvider } from '@/app/selected-items-context';
import DeleteButton from '@/components/delete-button';
import useProducts from '@/hooks/useProducts';
import Link from 'next/link';
import MoreActionsSelect from '@/components/products/more-actions-select';
import { useState } from 'react';
import ProductsPagination from '../../../../components/products/pagination';
import ProductsTable from '@/components/products/products-table';
import Loading from '@/app/loading';

const LIMIT_PER_PAGE = 10;
function ProductsContent() {
  const [filterParams, setFilterParams] = useState<any>({
    limit: LIMIT_PER_PAGE,
    skip: 0,
  });

  const { productsData, loading } = useProducts(filterParams);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
        {/* Page header */}
        <div className="mb-8 sm:flex sm:justify-between sm:items-center">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">
              Products
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
            {/* Delete button */}
            <DeleteButton />

            {/* Dropdown */}
            <MoreActionsSelect />

            <Link
              href={'/store-product/products/new-product'}
              className="text-gray-100 bg-gray-900 btn hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            >
              <svg
                className="fill-current shrink-0 xs:hidden"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="max-xs:sr-only">Add Product</span>
            </Link>
          </div>
        </div>

        <div>
          <ProductsTable
            products={productsData?.data}
            loading={loading}
            filterParams={filterParams}
            setFilterParams={setFilterParams}
          />
          <div className="mt-8">
            <ProductsPagination
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              data={{
                limit: productsData?.$limit,
                skip: productsData?.$skip,
                total: productsData?.total,
              }}
            />
          </div>
        </div>
        {/* Pagination */}
      </div>
    </>
  );
}

export default function Products() {
  return (
    <SelectedItemsProvider>
      <ProductsContent />
    </SelectedItemsProvider>
  );
}
