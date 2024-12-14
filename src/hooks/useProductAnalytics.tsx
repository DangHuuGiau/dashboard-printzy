import analyticsService from '@/api/analytic';
import { useState, useEffect } from 'react';

interface ProductAnalyticsParams {
  [key: string]: any;
}

const useProductAnalytics = ({
  startDate,
  endDate,
}: ProductAnalyticsParams) => {
  const [ProductAnalyticsData, setProductAnalyticsData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        if (startDate && endDate) {
          const response = await analyticsService.getProductAnalytics({
            startDate,
            endDate,
          });
          setProductAnalyticsData(response?.data || {});
        }
      } catch (err) {
        setError('Failed to fetch top products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductAnalytics();
  }, [endDate, startDate]);

  return ProductAnalyticsData;
};

export default useProductAnalytics;
