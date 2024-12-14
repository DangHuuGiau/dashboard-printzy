import analyticsService from '@/api/analytic';
import { useState, useEffect } from 'react';

interface OrderTotalByDateAnalyticsParams {
  [key: string]: any;
}

const useOrderTotalByDateAnalytics = ({
  startDate,
  endDate,
}: OrderTotalByDateAnalyticsParams) => {
  const [OrderTotalByDateAnalyticsData, setOrderTotalByDateAnalyticsData] =
    useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderTotalByDateAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        if (startDate && endDate) {
          const response = await analyticsService.getCalculateTotalByDay({
            startDate,
            endDate,
          });
          setOrderTotalByDateAnalyticsData(response?.data || {});
        }
      } catch (err) {
        setError('Failed to fetch top OrderTotalByDates.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderTotalByDateAnalytics();
  }, [endDate, startDate]);

  return OrderTotalByDateAnalyticsData;
};

export default useOrderTotalByDateAnalytics;
