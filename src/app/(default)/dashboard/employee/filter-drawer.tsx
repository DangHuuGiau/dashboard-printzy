import { useState } from 'react';

const employeeStatus = [
  { id: 1, name: 'All', value: undefined },
  { id: 2, name: 'Active', value: true },
  { id: 3, name: 'Locked', value: false },
];

interface Props {
  filterParams: any;
  setFilterParams: (filterParams: any) => void;
}

export default function FilterEmployees({
  filterParams,
  setFilterParams,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [inventoryStatus, setInventoryStatus] = useState<number>(1);

  const handleStatusChange = (id: number, value: boolean | undefined) => {
    setInventoryStatus(id);
    setFilterParams({ ...filterParams, isActive: value });
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="btn px-2.5 bg-white dark:bg-gray-800 border-gray-200 hover:border-gray-300 dark:border-gray-700/60 dark:hover:border-gray-600 text-gray-400 dark:text-gray-500"
        onClick={toggleDrawer}
      >
        <span className="sr-only">Filter</span>
        <wbr />
        <svg
          className="fill-current"
          width="16"
          height="16"
          viewBox="0 0 16 16"
        >
          <path d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1ZM3 8a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM7 12a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Z" />
        </svg>
      </button>

      {/* Drawer component */}
      <div
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } bg-white w-80 dark:bg-gray-800`}
      >
        <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
          Filter Options
        </h5>
        {/* Close button */}
        <button
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        {/* Filter content */}

        <div className="space-y-4">
          <div className="">
            <ul className="mb-4 space-y-2 sm:flex sm:space-y-0 sm:space-x-2 lg:space-y-2 lg:space-x-0 lg:flex-col">
              <li>
                <div className="w-full h-full px-4 py-3 text-left transition bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600">
                  <div className="flex flex-wrap items-center justify-between mb-0.5">
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      Status
                    </span>
                  </div>
                  {employeeStatus.map((status) => (
                    <div
                      className="text-sm"
                      key={`select-inventory-${status.value}`}
                    >
                      <div className="m-3">
                        {/* Start */}
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="inventory"
                            value={status.name}
                            checked={inventoryStatus === status.id}
                            onChange={() =>
                              handleStatusChange(status.id, status.value)
                            }
                            className="form-radio"
                          />
                          <span className="ml-2 text-sm">{status.name}</span>
                        </label>
                        {/* End */}
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
