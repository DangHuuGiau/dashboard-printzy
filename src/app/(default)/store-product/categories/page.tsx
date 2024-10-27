"use client";

import useCategories from "@/hooks/useCategories";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  const categories = useCategories();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="grid grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-xl"
            key={`category-${category.name}`}
          >
            <div className="flex flex-col h-52">
              {/* Image */}
              <div className="relative ">
                <Image
                  className="w-full"
                  src={category?.upload.path}
                  width={301}
                  height={226}
                  alt={category.name}
                />
                {/* Special Offer label */}
                <div className="absolute left-0 mb-4 ml-4 top-5">
                  <div className="inline-flex items-center text-base font-medium text-gray-100 dark:text-gray-300 bg-gray-900/60 dark:bg-gray-800/60 rounded-full text-center px-2 py-0.5">
                    <svg
                      className="w-3 h-3 mr-1 text-yellow-500 fill-current shrink-0"
                      viewBox="0 0 12 12"
                    >
                      <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                    </svg>
                    <span>{category.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 rounded-xl">
          <div className="flex flex-col h-52">
            {/* Image */}
            <Link
              href={"/store-product/categories/new-category"}
              className="flex items-center justify-center h-full"
            >
              <svg
                className="w-16 h-16 text-gray-500 dark:text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
