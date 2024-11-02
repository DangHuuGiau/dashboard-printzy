import customersService from '@/api/customers';
import { useState, useEffect } from 'react';

interface UseCustomersParams {
  [key: string]: any;
}

const useCustomers = ({ limit, skip, name }: UseCustomersParams) => {
  const [customersData, setCustomersData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
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

        const response = await customersService.getList(query);
        setCustomersData(response?.data || {});
      } catch (err) {
        setError('Failed to fetch Customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [limit, skip, name]);

  return customersData;
};

export default useCustomers;
