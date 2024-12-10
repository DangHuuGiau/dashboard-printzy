'use client';

import { useItemSelection } from '@/components/utils/use-item-selection';
import ProductsTableItem from './products-table-item';
import FilterDrawer from './filter-drawer';
import Loading from '@/app/loading';

interface Props {
  products: any[];
  loading: boolean;
  filterParams: any;
  setFilterParams: (filterParams: any) => void;
}

export default function ProductsTable({
  products,
  loading,
  filterParams,
  setFilterParams,
}: Props) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(products);

  return (
    <>
      <div className="relative bg-white shadow-sm dark:bg-gray-800 rounded-xl">
        <header className="flex items-center justify-between px-5 py-4">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Show products{' '}
            <span className="font-medium text-gray-400 dark:text-gray-500">
              {products?.length}
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <FilterDrawer
              filterParams={filterParams}
              setFilterParams={setFilterParams}
            />
            <div>
              <div className="relative">
                <input
                  id="form-search"
                  className="w-full form-input pl-9"
                  type="search"
                  placeholder="Search product..."
                  onChange={(e) =>
                    setFilterParams({ ...filterParams, name: e.target.value })
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
          </div>
        </header>
        <div>
          {/* Table */}
          {loading ? (
            <Loading />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto dark:text-gray-300">
                {/* Table header */}
                <thead className="text-xs font-semibold text-gray-500 uppercase border-t border-b border-gray-100 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-700/60">
                  <tr>
                    <th className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <label className="inline-flex">
                          <span className="sr-only">Select all</span>
                          <input
                            className="form-checkbox"
                            type="checkbox"
                            onChange={handleSelectAllChange}
                            checked={isAllSelected}
                          />
                        </label>
                      </div>
                    </th>
                    <th className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <span className="sr-only">Image</span>
                    </th>
                    <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <div className="font-semibold text-left">Name</div>
                    </th>
                    <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <div className="font-semibold text-left">SKU</div>
                    </th>
                    <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <div className="font-semibold text-left">Category</div>
                    </th>
                    <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <div className="font-semibold">Collection</div>
                    </th>
                    <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <div className="font-semibold text-left">Price</div>
                    </th>
                    <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <div className="font-semibold text-left">On Store</div>
                    </th>
                    <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                      <span className="sr-only">Menu</span>
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                  {products?.map((product) => (
                    <ProductsTableItem
                      key={product.id}
                      product={product}
                      onCheckboxChange={handleCheckboxChange}
                      isSelected={selectedItems.includes(product.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
