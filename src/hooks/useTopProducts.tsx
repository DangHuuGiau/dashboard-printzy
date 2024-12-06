import analyticsService from "@/api/analytic";
import { useState, useEffect } from "react";

interface TopProductsParams {
  [key: string]: any;
}

const useTopProducts = ({ startDate, endDate }: TopProductsParams) => {
  const [topProductsData, setTopProductsData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await analyticsService.getTopProducts({
          startDate,
          endDate,
        });
        setTopProductsData(response?.data || {});
      } catch (err) {
        setError("Failed to fetch top products.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, [startDate, startDate]);

  return topProductsData;
};

export default useTopProducts;
