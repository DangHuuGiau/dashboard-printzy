'use client';

import { useItemSelection } from '@/components/utils/use-item-selection';
import InvoicesTableItem from './invoices-table-item';
import UpdateInvoicesModal from './update-modal';
import { useState } from 'react';

export default function InvoicesTable({
  invoices,
  total,
  onModified,
}: {
  invoices: any[];
  total: number;
  onModified: () => void;
}) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(invoices);

  const [updatingInvoice, setUpdatingInvoice] = useState<any>();

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  return (
    <div className="relative bg-white shadow-sm dark:bg-gray-800 rounded-xl">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Invoices{' '}
          <span className="font-medium text-gray-400 dark:text-gray-500">
            {total || 0}
          </span>
        </h2>
      </header>
      <div>
        {/* Table */}
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
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Invoice Id</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Order Number</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Total</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Customer</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Created on</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Paid on</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Type</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {invoices?.map((invoice) => (
                <InvoicesTableItem
                  key={invoice.id}
                  invoice={invoice}
                  onCheckboxChange={handleCheckboxChange}
                  isSelected={selectedItems.includes(invoice.id)}
                  setUpdatingInvoice={setUpdatingInvoice}
                  setOpenUpdateModal={setOpenUpdateModal}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UpdateInvoicesModal
        invoice={updatingInvoice}
        open={openUpdateModal}
        onOpen={() => setOpenUpdateModal(!openUpdateModal)}
        onModified={() => onModified()}
      />
    </div>
  );
}
