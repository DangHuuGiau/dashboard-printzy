import invoicesService from '@/api/invoices';
import { useState, useEffect } from 'react';

interface UseInvoicesParams {
  [key: string]: any;
}

const useInvoices = ({
  limit,
  skip,
  keyword,
  status,
  forceRefresh,
  startDate,
  endDate,
}: UseInvoicesParams) => {
  const [invoicesData, setInvoicesData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      setError(null);

      try {
        const query: any = {};

        if (limit !== undefined) query.$limit = limit;
        if (skip !== undefined) query.$skip = skip;
        if (status !== undefined) query.status = status;
        if (keyword) query.keyword = keyword;

        if (startDate && endDate) {
          query.createdAt = { $btw: [startDate, endDate] };
        }

        Object.keys(query).forEach((key) => {
          if (
            query[key] === null ||
            query[key] === undefined ||
            query[key] === ''
          ) {
            delete query[key];
          }
        });

        const response = await invoicesService.getList(query);
        setInvoicesData(response?.data || {});
      } catch (err) {
        setError('Failed to fetch invoices.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [limit, skip, keyword, status, forceRefresh, startDate, endDate]);

  return invoicesData;
};

export default useInvoices;
