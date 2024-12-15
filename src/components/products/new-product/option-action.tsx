'use client';

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';

export default function OptionActionMenu({
  align,
  className = '',
  onEdit,
  onDelete,
}: React.HTMLAttributes<HTMLDivElement> & {
  align?: 'left' | 'right';
  className?: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <Menu as="div" className={`relative inline-flex ${className}`}>
      {({ open }) => (
        <>
          <MenuButton
            className={`rounded-full ${
              open
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
                : 'bg-white dark:bg-gray-700 text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <span className="sr-only">Menu</span>
            <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="2" />
              <circle cx="10" cy="16" r="2" />
              <circle cx="22" cy="16" r="2" />
            </svg>
          </MenuButton>
          <Transition
            as="div"
            className={`origin-top-right z-10 absolute top-full min-w-[9rem] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
            enter="transition ease-out duration-200 transform"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <MenuItems as="ul" className="focus:outline-none">
              <MenuItem as="li">
                <button
                  onClick={onDelete}
                  className={`font-medium text-sm flex py-1 px-3 text-red-500`}
                >
                  Delete
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
}
