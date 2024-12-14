'use client';

import { useItemSelection } from '@/components/utils/use-item-selection';
import OrdersTableItem from './employees-table-item';
import UpdateEmployeeModal from './update-modal';
import { useState } from 'react';

export default function EmployeesTable({
  employees,
  total,
}: {
  employees: any[];
  total: number;
}) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(employees);

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatingEmployee, setUpdatingEmployee] = useState<any>();

  return (
    <div className="relative bg-white shadow-sm dark:bg-gray-800 rounded-xl">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          All Employees{' '}
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
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Created Date</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
                <th className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
                  <span className="sr-only">Menu</span>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            {employees?.map((employee) => (
              <OrdersTableItem
                key={employee.id}
                employee={employee}
                onCheckboxChange={handleCheckboxChange}
                isSelected={selectedItems.includes(employee.id)}
                onOpen={setUpdateModalOpen}
                setUpdatingEmployee={setUpdatingEmployee}
              />
            ))}
          </table>
        </div>
      </div>
      <UpdateEmployeeModal
        employee={updatingEmployee}
        open={isUpdateModalOpen}
        onOpen={setUpdateModalOpen}
        onEmployeeUpdated={() => {}}
      />
    </div>
  );
}
