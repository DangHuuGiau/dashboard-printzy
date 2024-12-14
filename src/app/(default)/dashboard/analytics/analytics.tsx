'use client';

import { useEffect, useState } from 'react';
import Datepicker from '@/components/datepicker';
import AnalyticsCard01 from './analytics-card-01';
import AnalyticsCard02 from './analytics-card-02';
import AnalyticsCard03 from './analytics-card-03';
import AnalyticsCard04 from './analytics-card-04';
import AnalyticsCard05 from './analytics-card-05';
import DashboardCard01 from './dashboard-card-01';
import DashboardCard02 from './dashboard-card-02';
import DashboardCard03 from './dashboard-card-03';
import useOrders from '@/hooks/useOrders';
import useCustomers from '@/hooks/useCustomers';
import useTopProducts from '@/hooks/useTopProducts';
import useTopCategories from '@/hooks/useTopCategories';
import useTopCollections from '@/hooks/useTopCollections';
import useProductAnalytics from '@/hooks/useProductAnalytics';
import AnalyticsVnPayPayment from './analytics-vnpay';
import customersService from '@/api/customers';
import useOrderTotalByDateAnalytics from '@/hooks/useOrderTotalByDateAnalytics';

export default function Analytics() {
  const [totalUser, setTotalUser] = useState(0);
  const [dates, setDates] = useState<[Date | null, Date | null]>([
    new Date(new Date().setDate(new Date().getDate() - 7)), // 7 days before today
    new Date(),
  ]);
  const ordersData = useOrders({ startDate: dates[0], endDate: dates[1] });
  const customersData = useCustomers({
    startDate: dates[0],
    endDate: dates[1],
  });

  const topProductsData = useTopProducts({
    startDate: dates[0],
    endDate: dates[1],
  });
  const topCategoriesData = useTopCategories({
    startDate: dates[0],
    endDate: dates[1],
  });
  const topCollectionsData = useTopCollections({
    startDate: dates[0],
    endDate: dates[1],
  });
  const productAnalyticsData = useProductAnalytics({
    startDate: dates[0],
    endDate: dates[1],
  });

  const orderTotalByDateAnalyticsData = useOrderTotalByDateAnalytics({
    startDate: dates[0],
    endDate: dates[1],
  });

  const revenue = ordersData?.data?.reduce(
    (sum: any, order: any) => sum + parseFloat(order.total),
    0
  );
  const profit = calculateTotalProfit(ordersData?.data);
  const totalCustomersSpend = customersData?.data?.reduce(
    (total: any, item: any) => total + item.totalPaymentSum,
    0
  );

  function calculateTotalProfit(orders: any) {
    return orders?.reduce((totalProfit: any, order: any) => {
      const totalBaseCost = order.orderItems.reduce((sum: any, item: any) => {
        return sum + item.quantity * parseFloat(item.variant.baseCost);
      }, 0);
      const totalAmount = parseFloat(order.total);
      const profit = totalAmount - totalBaseCost;
      return totalProfit + profit;
    }, 0);
  }

  const getTotalUser = async () => {
    const response = await customersService.getList({});
    setTotalUser(response?.data?.total || 0);
    return;
  };
  useEffect(() => {
    getTotalUser();
  }, []);

  return (
    <div>
      <div className="mb-8 sm:flex sm:justify-between sm:items-center">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">
            Analytics
          </h1>
        </div>

        <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
          <Datepicker
            align="right"
            onDateChange={(selectedDates: Date[]) => {
              setDates([selectedDates[0], selectedDates[1] || null]);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <DashboardCard01 revenue={revenue} />
        <DashboardCard02 profit={profit} />
        <DashboardCard03 totalOrder={ordersData?.total} />

        <AnalyticsCard01
          totalCustomers={totalUser}
          newCustomers={customersData?.total}
          total={orderTotalByDateAnalyticsData}
        />
        <AnalyticsCard02 data={topProductsData} />
        <AnalyticsCard03 data={topCategoriesData} />
        <AnalyticsCard04 data={topCollectionsData} />
        <AnalyticsVnPayPayment total={profit} />
        <AnalyticsCard05 data={productAnalyticsData} />
      </div>
    </div>
  );
}
