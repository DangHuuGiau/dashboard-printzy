'use client';

import { useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';
interface DateSelectProps {
  options?: { id: number; period: string }[];
  defaultSelected?: number;
  onChange?: (selected: number) => void;
}

export default function DateSelect({
  options = [
    { id: 0, period: 'Today' },
    { id: 1, period: 'Last 7 Days' },
    { id: 2, period: 'Last Month' },
    { id: 3, period: 'Last 12 Months' },
    { id: 4, period: 'All Time' },
  ],
  defaultSelected = 0,
  onChange,
}: DateSelectProps) {
  const [selected, setSelected] = useState<number>(defaultSelected);

  const handleSelection = (id: number) => {
    setSelected(id);
    if (onChange) onChange(id);
  };

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
              <span>{options[selected].period}</span>
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
            <MenuItems className="text-sm font-medium text-gray-600 dark:text-gray-300 focus:outline-none">
              {options.map((option, optionIndex) => (
                <MenuItem key={optionIndex}>
                  {({ active }) => (
                    <button
                      className={`flex items-center w-full py-1 px-3 cursor-pointer ${
                        active ? 'bg-gray-50 dark:bg-gray-700/20' : ''
                      } ${option.id === selected && 'text-violet-500'}`}
                      onClick={() => handleSelection(option.id)}
                    >
                      <svg
                        className={`shrink-0 mr-2 fill-current text-violet-500 ${
                          option.id !== selected && 'invisible'
                        }`}
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                      >
                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                      </svg>
                      <span>{option.period}</span>
                    </button>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}
