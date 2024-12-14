import analyticsService from '@/api/analytic';
import { useState, useEffect } from 'react';

interface TopCollectionsParams {
  [key: string]: any;
}

const useTopCollections = ({ startDate, endDate }: TopCollectionsParams) => {
  const [topCollectionsData, setTopCollectionsData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCollections = async () => {
      setLoading(true);
      setError(null);

      try {
        if (startDate && endDate) {
          const response = await analyticsService.getTopCollections({
            startDate,
            endDate,
          });
          setTopCollectionsData(response?.data || {});
        }
      } catch (err) {
        setError('Failed to fetch top products.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopCollections();
  }, [endDate, startDate]);

  return topCollectionsData;
};

export default useTopCollections;
