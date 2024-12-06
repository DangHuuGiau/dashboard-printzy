"use client";

import EditMenu from "@/components/edit-menu";

export default function DashboardCard03({
  totalOrder,
}: {
  totalOrder: number | 0;
}) {
  return (
    <div className="flex flex-col bg-white shadow-sm col-span-full sm:col-span-6 xl:col-span-4 dark:bg-gray-800 rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex items-start justify-between mb-2">
          <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
            Total Order
          </h2>
          {/* Menu button */}
          <EditMenu align="right" />
        </header>
        <div className="mb-1 text-xs font-semibold text-gray-400 uppercase dark:text-gray-500">
          Sales
        </div>
        <div className="flex items-start">
          <div className="mr-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
            {totalOrder || 0}
          </div>
        </div>
      </div>
    </div>
  );
}
