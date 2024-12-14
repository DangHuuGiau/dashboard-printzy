'use client';

import LineChart03 from '@/components/charts/line-chart-03';
import { chartAreaGradient } from '@/components/charts/chartjs-config';
import { tailwindConfig, hexToRGB } from '@/components/utils/utils';
import { useEffect, useState } from 'react';

type AnalyticsCardProps = {
  totalCustomers: number;
  newCustomers: number;
  total: any;
};

export default function AnalyticsCard01({
  totalCustomers = 0,
  newCustomers = 0,
  total,
}: AnalyticsCardProps) {
  const [chartTotal, setChartTotal] = useState<number[]>([]);
  const [chartProfit, setChartProfit] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  useEffect(() => {
    const updatedChartTotal: number[] = [];
    const updatedChartProfit: number[] = [];
    const updatedChartLabels: string[] = [];

    // Duyệt qua dữ liệu total và cập nhật chartTotal, chartProfit, và chartLabels
    total?.forEach(
      (entry: { date: string; total: number; totalProfit: number }) => {
        const date = new Date(entry.date);
        const formattedDate = `${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date
          .getDate()
          .toString()
          .padStart(2, '0')}-${date.getFullYear()}`;

        // Thêm tổng chi tiêu vào chartTotal
        updatedChartTotal.push(entry.total);
        // Thêm lợi nhuận vào chartProfit
        updatedChartProfit.push(entry.totalProfit);
        // Thêm ngày vào chartLabels
        updatedChartLabels.push(formattedDate);
      }
    );

    // Cập nhật lại state với dữ liệu mới
    setChartTotal(updatedChartTotal);
    setChartProfit(updatedChartProfit);
    setChartLabels(updatedChartLabels);
  }, [total]);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Current',
        data: chartTotal,
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
          return gradientOrColor || 'transparent';
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
      {
        label: 'Profit',
        data: chartProfit,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          const gradientOrColor = chartAreaGradient(ctx, chartArea, [
            {
              stop: 0,
              color: `rgba(${hexToRGB(
                tailwindConfig.theme.colors.green[500]
              )}, 0)`,
            },
            {
              stop: 1,
              color: `rgba(${hexToRGB(
                tailwindConfig.theme.colors.green[500]
              )}, 0.2)`,
            },
          ]);
          return gradientOrColor || 'transparent';
        },
        borderColor: tailwindConfig.theme.colors.green[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig.theme.colors.green[500],
        pointHoverBackgroundColor: tailwindConfig.theme.colors.green[500],
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
          Overview Analytics
        </h2>
      </header>
      <div className="px-5 py-1">
        <div className="flex flex-wrap max-sm:*:w-1/2">
          <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="mr-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {totalCustomers}
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
                  {newCustomers}
                </div>
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
          {/* <div className="flex items-center py-2">
            <div className="mr-5">
              <div className="flex items-center">
                <div className="mr-2 text-3xl font-bold text-gray-800 dark:text-gray-100">
                  &#8363; {totalSpend}
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Spend
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="grow">
        <LineChart03 data={chartData} width={800} height={300} />
      </div>
    </div>
  );
}
