"use client";

import LineChart03 from "@/components/charts/line-chart-03";
import { chartAreaGradient } from "@/components/charts/chartjs-config";

// Import utilities
import { tailwindConfig, hexToRGB } from "@/components/utils/utils";

export default function AnalyticsCard01({
  totalCustomers,
  newCustomers,
  totalSpend,
}: {
  totalCustomers: any;
  newCustomers: any;
  totalSpend: any;
}) {
  const chartData = {
    labels: [
      "01-01-2024",
      "02-01-2024",
      "03-01-2024",
      "04-01-2024",
      "05-01-2024",
      "06-01-2024",
      "07-01-2024",
      "08-01-2024",
      "09-01-2024",
      "10-01-2024",
      "11-01-2024",
      "12-01-2024",
      "01-01-2025",
    ],
    datasets: [
      // Indigo line
      {
        label: "Current",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          const gradientOrColor = chartAreaGradient(ctx, chartArea, [
            {
              stop: 0,
              color: `rgba(${hexToRGB(
                tailwindConfig.theme.colors.violet[500]
              )}, 0)`,
            },
            {
              stop: 1,
              color: `rgba(${hexToRGB(
                tailwindConfig.theme.colors.violet[500]
              )}, 0.2)`,
            },
          ]);
          return gradientOrColor || "transparent";
        },
        borderColor: tailwindConfig.theme.colors.violet[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig.theme.colors.violet[500],
        pointHoverBackgroundColor: tailwindConfig.theme.colors.violet[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col bg-white shadow-sm col-span-full dark:bg-gray-800 rounded-xl">
      <header className="flex items-center px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Customers Analytics
        </h2>
      </header>
      <div className="px-5 py-1">
        <div className="flex flex-wrap max-sm:*:w-1/2">
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="mr-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {totalCustomers || 0}
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Customers
              </div>
            </div>
            <div
              className="hidden w-px h-8 mr-5 bg-gray-200 md:block dark:bg-gray-700"
              aria-hidden="true"
            ></div>
          </div>
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="mr-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {newCustomers || 0}
                </div>
                {/* <div className="text-sm font-medium text-green-600">+49%</div> */}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                New Customers
              </div>
            </div>
            <div
              className="hidden w-px h-8 mr-5 bg-gray-200 md:block dark:bg-gray-700"
              aria-hidden="true"
            ></div>
          </div>
          {/* Total Pageviews */}
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="mr-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
                  &#8363; {totalSpend || 0}
                </div>
                {/* <div className="text-sm font-medium text-green-600">+7%</div> */}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Spend
              </div>
            </div>
          </div>
          {/* Bounce Rate */}
          {/* Visit Duration*/}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart03 data={chartData} width={800} height={300} />
      </div>
    </div>
  );
}
