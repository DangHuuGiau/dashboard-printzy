import employeesService from '@/api/employees';
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface CustomersTableItemProps {
  employee: any;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
  onOpen: (open: boolean) => void;
  setUpdatingEmployee: (employee: any) => void;
}

export default function OrdersTableItem({
  employee,
  onCheckboxChange,
  isSelected,
  onOpen,
  setUpdatingEmployee,
}: CustomersTableItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckboxChange(employee.id, e.target.checked);
  };

  const statusColor = (isActive: boolean): string => {
    switch (isActive) {
      case true:
        return 'bg-green-500/20 text-green-700';
      case false:
        return 'bg-yellow-500/20 text-yellow-700';
    }
  };
  const [isActive, setIsActive] = useState(employee.isActive);

  const handleChangeActive = async () => {
    try {
      await employeesService.update({ isActive: !isActive }, employee.id);
      setIsActive(!isActive);
      toast.error('Updated Employee');
    } catch (err: any) {
      toast.error(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                className="form-checkbox"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={isSelected}
              />
            </label>
          </div>
        </td>

        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {employee.firstName} {employee.lastName}
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {employee.email}
          </div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div>{dayjs(employee.createdAt).format('DD-MM-YYYY HH:mm')}</div>
        </td>
        <td className="px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div
            className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
              isActive
            )}`}
          >
            {isActive ? 'Active' : 'Lock'}
          </div>
        </td>
        <td className="w-px px-2 py-3 first:pl-5 last:pr-5 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <button
              className="text-gray-400 rounded-full hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => {
                onOpen(true);
                setUpdatingEmployee(employee);
              }}
            >
              <span className="sr-only">Edit</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
              </svg>
            </button>

            {isActive ? (
              <button
                className="text-red-500 rounded-full hover:text-red-600"
                onClick={handleChangeActive}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </button>
            ) : (
              <button
                className="text-red-500 rounded-full hover:text-red-600"
                onClick={handleChangeActive}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                </svg>
              </button>
            )}
          </div>
        </td>
      </tr>
    </tbody>
  );
}
