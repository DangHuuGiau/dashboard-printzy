import ordersService from '@/api/orders';
import { useState, useEffect } from 'react';

interface UseOrdersParams {
  [key: string]: any;
}

const useOrders = ({ limit, skip, name }: UseOrdersParams) => {
  const [ordersData, setOrdersData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const query: any = {};

        if (limit !== undefined) query.$limit = limit;
        if (skip !== undefined) query.$skip = skip;
        if (name) query.name = { $iLike: `%${name}%` };

        Object.keys(query).forEach((key) => {
          if (
            query[key] === null ||
            query[key] === undefined ||
            query[key] === ''
          ) {
            delete query[key];
          }
        });

        const response = await ordersService.getList(query);
        setOrdersData(response?.data || {});
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [limit, skip, name]);

  return ordersData;
};

export default useOrders;
