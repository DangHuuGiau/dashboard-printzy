export default function AnalyticsCard05({ data }: { data: any[] }) {
  return (
    <div className="bg-white shadow-sm col-span-full dark:bg-gray-800 rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Products
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs text-gray-400 uppercase rounded-sm dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">SKU</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Category</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Total Reviews</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Quantity Sold</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Revenue</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Profit</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {/* Row */}
              {data?.map((product) => (
                <tr key={product.productId}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800 dark:text-gray-100">
                        {product.productName}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="font-medium text-gray-800 dark:text-gray-100">
                      {product.productSKU}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="font-medium text-gray-800 dark:text-gray-100">
                      {product.categoryName}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center">{product.totalReviews}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-center">{product.totalSold}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="font-medium text-left text-green-600">
                      &#8363; {product.totalRevenue}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="font-medium text-left text-green-600">
                      &#8363; {product.totalProfit}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
