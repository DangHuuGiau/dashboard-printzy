'use client';

import categoriesService from '@/api/categories';
import CategoryActionMenu from '@/components/categories/action';
import ConfirmModal from '@/components/ui/confirm-modal';
import { useConfirm } from '@/contexts/modal/ConfirmContext';
import useCategories from '@/hooks/useCategories';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Categories() {
  const { confirm } = useConfirm();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const categories = useCategories({ name: searchTerm });

  const handleDelete = async (id: number) => {
    await categoriesService.deleteOne(id);
  };

  const onConfirmDelete = (name: string, id: number) => {
    confirm({
      title: `Delete this category ${name}`,
      message: `Are you sure to delete this category ${name}`,
      onConfirm: () => handleDelete(id),
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="flex items-center justify-between w-full mb-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Category - {categories?.length}
        </h2>

        <div className="flex items-center gap-2">
          <div>
            <div className="relative">
              <input
                id="form-search"
                className="w-full form-input pl-9"
                type="search"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
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

          <Link
            href={'/store-product/categories/new-category'}
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
            <span className="max-xs:sr-only">Add Category</span>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            // href={`/store-product/categories/${category.id}`}
            className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-xl"
            key={`category-${category.id}`}
          >
            <div className="flex flex-col h-52">
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  className="object-cover w-full h-full"
                  src={category?.upload?.path}
                  width={301}
                  height={226}
                  alt={category.name}
                />
                <div className="absolute left-0 mb-4 ml-4 top-5">
                  <div className="inline-flex items-center text-base font-medium text-gray-100 dark:text-gray-300 bg-gray-900/60 dark:bg-gray-800/60 rounded-full text-center px-2 py-0.5">
                    <span>
                      {category.name} - {category.categoryProducts?.length}
                    </span>
                  </div>
                </div>
                <div className="absolute right-0 mb-4 mr-4 top-4">
                  <CategoryActionMenu
                    align="right"
                    id={category.id}
                    onDelete={() => onConfirmDelete(category.name, category.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal />
    </div>
  );
}
