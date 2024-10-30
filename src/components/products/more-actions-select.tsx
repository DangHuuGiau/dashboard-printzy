'use client';

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';

export default function MoreActionsSelect() {
  return (
    <Menu as="div" className="relative inline-flex">
      {({ open }) => (
        <>
          <MenuButton
            className="btn justify-between min-w-[11rem] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
            aria-label="Select date range"
          >
            <span className="flex items-center">
              <svg
                className="mr-2 text-gray-400 fill-current dark:text-gray-500 shrink-0"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
              </svg>
              <span>More Actions</span>
            </span>
            <svg
              className="ml-1 text-gray-400 fill-current shrink-0 dark:text-gray-500"
              width="11"
              height="7"
              viewBox="0 0 11 7"
            >
              <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
            </svg>
          </MenuButton>
          <Transition
            as="div"
            className="z-10 absolute top-full right-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1"
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <MenuItems className="text-base font-medium text-gray-600 dark:text-gray-300 focus:outline-none">
              <MenuItem>
                <button
                  className={`flex items-center w-full py-1 px-3 cursor-pointer
                        bg-gray-50 dark:bg-gray-700/20 gap-2`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                    className="wds_1_126_0_ListItemAction__prefixIcon wds_1_126_0_ListItemAction--subtitle"
                    data-hook="list-item-action-prefix-icon"
                  >
                    <path d="M5,13 L5,17 C5,17.5522847 5.44771525,18 6,18 L17,18 C17.5522847,18 18,17.5522847 18,17 L18,13 L19,13 L19,17 C19,18.1045695 18.1045695,19 17,19 L6,19 C4.8954305,19 4,18.1045695 4,17 L4,13 L5,13 Z M11,13.2928932 L11,5 L12,5 L12,13.2928932 L14.1464466,11.1464466 C14.3417088,10.9511845 14.6582912,10.9511845 14.8535534,11.1464466 C15.0488155,11.3417088 15.0488155,11.6582912 14.8535534,11.8535534 L11.5,15.2071068 L8.14644661,11.8535534 C7.95118446,11.6582912 7.95118446,11.3417088 8.14644661,11.1464466 C8.34170876,10.9511845 8.65829124,10.9511845 8.85355339,11.1464466 L11,13.2928932 Z"></path>
                  </svg>
                  <span>Export</span>
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className={`flex items-center w-full py-1 px-3 cursor-pointer
                        bg-gray-50 dark:bg-gray-700/20 gap-2`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                    className="wds_1_126_0_ListItemAction__prefixIcon wds_1_126_0_ListItemAction--subtitle"
                    data-hook="list-item-action-prefix-icon"
                  >
                    <path d="M5,13 L5,17 C5,17.5522847 5.44771525,18 6,18 L17,18 C17.5522847,18 18,17.5522847 18,17 L18,13 L19,13 L19,17 C19,18.1045695 18.1045695,19 17,19 L6,19 C4.8954305,19 4,18.1045695 4,17 L4,13 L5,13 Z M11,6.70710678 L8.85355339,8.85355339 C8.65829124,9.04881554 8.34170876,9.04881554 8.14644661,8.85355339 C7.95118446,8.65829124 7.95118446,8.34170876 8.14644661,8.14644661 L11.5,4.79289322 L14.8535534,8.14644661 C15.0488155,8.34170876 15.0488155,8.65829124 14.8535534,8.85355339 C14.6582912,9.04881554 14.3417088,9.04881554 14.1464466,8.85355339 L12,6.70710678 L12,16 L11,16 L11,6.70710678 Z"></path>
                  </svg>
                  <span>Import</span>
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}
