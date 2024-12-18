import Link from 'next/link';

export default function AnalyticsCard02({ data }: { data: any[] }) {
  return (
    <div className="flex flex-col bg-white shadow-sm col-span-full sm:col-span-6 xl:col-span-4 dark:bg-gray-800 rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Top Products
        </h2>
      </header>
      <div className="p-3 grow">
        <div className="flex flex-col h-full">
          {/* Card content */}
          <div className="grow">
            <ul className="flex justify-between px-2 space-x-2 text-xs font-semibold text-gray-400 uppercase dark:text-gray-500">
              <li>SKU</li>
              <li>Bought</li>
            </ul>
            <ul className="mt-3 mb-4 space-y-1 text-sm text-gray-800 dark:text-gray-100">
              {data?.map((product: any) => (
                <li key={product.sku} className="relative px-2 py-1">
                  <div
                    className="absolute inset-0 rounded-r bg-violet-100 dark:bg-violet-500/20"
                    aria-hidden="true"
                    style={{
                      width: `${
                        (product.totalQuantity /
                          data.reduce(
                            (sum, item) => sum + item.totalQuantity,
                            0
                          )) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div className="relative flex justify-between space-x-2">
                    <div>{product.productSKU}</div>
                    <div className="font-medium">{product.totalQuantity}</div>
                  </div>
                </li>
              ))}

              {/* Item */}
            </ul>
          </div>
          {/* Card footer */}
          <div className="pt-4 pb-1 text-center border-t border-gray-100 dark:border-gray-700/60">
            <Link
              className="text-sm font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
              href="#0"
            >
              Product Report -&gt;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
