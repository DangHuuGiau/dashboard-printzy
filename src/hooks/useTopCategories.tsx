import analyticsService from "@/api/analytic";
import { useState, useEffect } from "react";

interface TopCategoriesParams {
  [key: string]: any;
}

const useTopCategories = ({ startDate, endDate }: TopCategoriesParams) => {
  const [topCategoriesData, setTopCategoriesData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await analyticsService.getTopCategories({
          startDate,
          endDate,
        });
        setTopCategoriesData(response?.data || {});
      } catch (err) {
        setError("Failed to fetch top products.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopCategories();
  }, [startDate, startDate]);

  return topCategoriesData;
};

export default useTopCategories;
