'use client';

import { useItemSelection } from '@/components/utils/use-item-selection';
import OrdersTableItem from './customers-table-item';

export default function CustomersTable({
  customers,
  total,
}: {
  customers: any[];
  total: number;
}) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(customers);

  return (
    <div className="relative bg-white shadow-sm dark:bg-gray-800 rounded-xl">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          All Customers{' '}
          <span className="font-medium text-gray-400 dark:text-gray-500">
            {total || 0}
          </span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-100 table-auto dark:text-gray-300 dark:divide-gray-700/60">
            {/* Table header */}
            <thead className="text-xs text-gray-500 uppercase border-t border-gray-100 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 dark:border-gray-700/60">
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
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Customer</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Created Date</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Total Spend</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold">Cart Items</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">
                    Default Location
                  </div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-center">Actions</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {customers?.map((customer) => (
              <OrdersTableItem
                key={customer.id}
                customer={customer}
                onCheckboxChange={handleCheckboxChange}
                isSelected={selectedItems.includes(customer.id)}
              />
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
