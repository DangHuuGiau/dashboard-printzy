'use client';

import DoughnutChart from '@/components/charts/doughnut-chart';

// Import utilities
import { tailwindConfig } from '@/components/utils/utils';
import { useEffect, useState } from 'react';

export default function AnalyticsCard09({ total }: { total: number }) {
  const [totalSpend, setTotalSpend] = useState<any>();
  useEffect(() => {
    setTotalSpend(total);
  }, [total]);

  const chartData = {
    labels: ['Vnpay'],
    datasets: [
      {
        label: 'Total',
        data: [totalSpend],
        backgroundColor: [
          tailwindConfig.theme.colors.violet[500],
          tailwindConfig.theme.colors.sky[500],
          tailwindConfig.theme.colors.red[500],
          tailwindConfig.theme.colors.green[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig.theme.colors.violet[600],
          tailwindConfig.theme.colors.sky[600],
          tailwindConfig.theme.colors.red[600],
          tailwindConfig.theme.colors.green[600],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col bg-white shadow-sm col-span-full sm:col-span-6 xl:col-span-4 dark:bg-gray-800 rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Payment methods
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}
